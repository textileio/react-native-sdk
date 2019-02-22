import { AppState, AppStateStatus, DeviceEventEmitter } from 'react-native'
import {
  CafeConfig,
  DiscoveredCafes,
  TextileAppStateStatus,
  TextileOptions,
  WalletAccount,
  NodeState,
  TextileConfig
} from './Models'
import API from './API'
import TextileStore from './store'
import NativeEvents from '../NativeEvents'
import TextileMigration from './migration'
import Events, * as TextileEvents from './events'
import { createTimeout, delay } from './helpers'
import BackgroundTimer from 'react-native-background-timer'
import BackgroundFetch from 'react-native-background-fetch'
import RNFS from 'react-native-fs'

import { pb } from './Models'

const packageFile = require('./../../package.json')
export const VERSION = packageFile.version

const MIGRATION_NEEDED_ERROR = 'repo needs migration'
const INIT_NEEDED_ERROR = 'repo does not exist, initialization is required'

export function BackgroundTask () {
  TextileEvents.backgroundTask()
}

class Textile extends API {
  events = new Events()
  migration = new TextileMigration()
  _debug = false
  _store = new TextileStore()
  _nativeEvents = NativeEvents
  _config: TextileConfig = {}
  _cafe?: CafeConfig
  _initialized = false

  repoPath = `${RNFS.DocumentDirectoryPath}/textile-go`

  constructor(options: TextileOptions) {
    super()
    if (options.debug) {
      this._debug = true
    }
    if (this._debug) {
      console.info('Initializing @textile/react-native-sdk v. ' + VERSION)
    }
  }

  // De-register the listeners
  tearDown() {
    // Clear on out too if detected to help speed up any startup time
    // Clear all our listeners
    this._nativeEvents.removeListener('onOnline', this.onOnlineCallback)
    DeviceEventEmitter.removeListener(TextileEvents.privateEvents.backgroundTask, this.backgroundTaskCallback)
    DeviceEventEmitter.removeListener(TextileEvents.privateEvents.createAndStartNode, this.createAndStartNodeCallback)
    if (this._config.SELF_MANAGE_APP_STATE) {
      DeviceEventEmitter.removeListener('@textile/notifyAppStateChange', this.notifyAppStateChangeCallback)
    } else {
      AppState.removeEventListener('change', this.nextStateCallback)
    }
  }

  // setup should only be run where the class will remain persistent so that
  // listeners will be wired in to one instance only,
  setup = async (config?: TextileConfig, cafe?: CafeConfig) => {
    // if config provided, set it
    if (config) {
      this._config = config
    }
    if (cafe) {
      this._cafe = cafe
    }

    return this.initializeAppState()
  }

  isInitializedCheck = () => {
    if (!this._initialized) {
      TextileEvents.nonInitializedError()
      if (this._debug) {
        console.error('@textile/react-native-sdk: Attempt to call a Textile instance method on an uninitialized instance')
      }
    }
  }

  /* ---- STATE BASED METHODS ----- */
  //  All methods here should only be called as the result of a sequenced kicked off
  //  By an event and detected by the persistent instance that executed setup()
  getCurrentState = () => {
    const currentAppState = AppState.currentState
    return currentAppState || 'unknown'
  }

  // Simply create the node, useful only if you want to create in advance of starting
  createNode = async () => {
    const debug = !this._config.RELEASE_TYPE || this._config.RELEASE_TYPE === 'development'
    await this.updateNodeState(NodeState.creating)
    const needsMigration = await this.migration.requiresFileMigration(this.repoPath)
    if (needsMigration) {
      await this.migration.runFileMigration(this.repoPath)
    }
    await this.newTextile(this.repoPath, debug)

    await this.updateNodeState(NodeState.created)
  }

  startNode = async () => {

    await this.updateNodeState(NodeState.starting)

    await this.start()

    if (this._cafe) {
      const sessions = await this.cafeSessions()
      if (!sessions || sessions.values.length < 1) {
        const cafeOverride = this._cafe.TEXTILE_CAFE_OVERRIDE
        if (cafeOverride) {
          await this.registerCafe(cafeOverride, this._cafe.TEXTILE_CAFE_TOKEN)
        } else if (this._cafe.TEXTILE_CAFE_GATEWAY_URL) {
          await this.discoverAndRegisterCafes()
        }
      }
    }
    await this.updateNodeState(NodeState.started)
    TextileEvents.startNodeFinished()
  }

  // Start the node, create it if it doesn't exist. Safe to call on every start.
  createAndStartNode = async () => {
    // TODO
    /* In redux/saga world, we did a // yield call(() => task.done) to ensure this wasn't called
    while already running. Do we need the same check to ensure it doesn't happen here?
    */
    this.isInitializedCheck()

    const prevState = await this._store.getNodeState()
    // if the known state isn't stopped, nonexistent, or in error... don't try to create it
    if (
      prevState && (
        prevState.state === NodeState.starting ||
        prevState.state === NodeState.started
      )) {
      return
    }
    try {

      await this.createNode()
      await this.startNode()

    } catch (error) {
      try {
        if (error.message === MIGRATION_NEEDED_ERROR) {
          // perform the repo migration
          await this.runRepoMigration()
          // call the create/start sequence again
          await this.createAndStartNode()
        } else if (error.message === INIT_NEEDED_ERROR) {
          // initialize our wallet
          await this.initWallet()
          // call the create/start sequence again
          await this.createAndStartNode()
        } else {
          TextileEvents.newError(error.message, 'startNodeError')
          await this.updateNodeStateError(error)
        }
      } catch (error) {
        TextileEvents.newError(error.message, 'startNodeError')
        await this.updateNodeStateError(error)
      }
    }
  }

  // Useful if an app wishes to shut down the node
  shutDown = async () => {
    await this.stopNode()
  }

  discoverAndRegisterCafes = async () => {
    this.isInitializedCheck()
    try {
      if (this._cafe) {
        const cafes = await createTimeout(10000, this.discoverCafes())
        const discoveredCafes = cafes as DiscoveredCafes
        await this.registerCafe(discoveredCafes.primary.url, this._cafe.TEXTILE_CAFE_TOKEN || '')
        await this.registerCafe(discoveredCafes.secondary.url, this._cafe.TEXTILE_CAFE_TOKEN || '')
      } else {
        TextileEvents.newError('no cafe config provided', 'cafeConfigError')
      }
    } catch (error) {
      // When this happens, you should retry the discover and register...
      TextileEvents.newError('cafe discovery timed out, internet connection needed', 'cafeDiscoveryError')
    }
  }

  /* ----- STATE FREE PUBLIC SELECTORS ----- */
  isInitialized = () => {
    return this._initialized
  }

  appState = async (): Promise<TextileAppStateStatus> => {
    const storedState = await this._store.getAppState()
    const currentState = storedState || 'unknown' as TextileAppStateStatus
    return currentState
  }

  nodeOnline = async (): Promise<boolean> => {
    const online = await this._store.getNodeOnline()
    return !!online // store can return void, in which case default return false
  }

  nodeState = async (): Promise<NodeState> => {
    const storedState = await this._store.getNodeState()
    if (!storedState) {
      return NodeState.nonexistent
    }
    return storedState.state
  }

  // Client should use this once account is onboarded to register with Cafe
  getCafeSessions = async (): Promise<ReadonlyArray<pb.ICafeSession>> => {
    const sessions = await this.cafeSessions()
    if (!sessions) {
      return []
    }
    return sessions.values
  }

  // Client should use this if cafe sessions are detected as expired
  getRefreshedCafeSessions = async (): Promise<ReadonlyArray<pb.ICafeSession>> => {
    const sessions = await this.cafeSessions()
    if (!sessions) {
      return []
    }
    const refreshedValues = await Promise.all(
      sessions.values.map(async (session) => await this.refreshCafeSession(session.id))
    )
    const reduced = refreshedValues.reduce<pb.ICafeSession[]>((acc, val) => {
      if (val) {
        acc.push(val)
      }
      return acc
    }, [])
    return reduced
  }

  /* ------ INTERNAL METHODS ----- */
  private initWallet = async () => {
    const debug = !this._config.RELEASE_TYPE || this._config.RELEASE_TYPE !== 'production'
    await this.updateNodeState(NodeState.creatingWallet)
    const recoveryPhrase: string = await this.newWallet(12)
    TextileEvents.setRecoveryPhrase(recoveryPhrase)
    await this.updateNodeState(NodeState.derivingAccount)
    const walletAccount: WalletAccount = await this.walletAccountAt(recoveryPhrase, 0)
    await this.updateNodeState(NodeState.initializingRepo)
    await this.initRepo(walletAccount.seed, this.repoPath, true, debug)
    await this.updateNodeState(NodeState.walletInitSuccess)
    TextileEvents.walletInitSuccess()
  }
  private runRepoMigration = async () => {
    // instruct the node to export data to files
    await this.migrateRepo(this.repoPath)
    // store the fact there is a pending migration in the preferences redux persisted state
    TextileEvents.migrationNeeded()
    await this.updateNodeState(NodeState.postMigration)
  }
  private manageNode = async (previousState: TextileAppStateStatus, newState: TextileAppStateStatus) => {
    this.isInitializedCheck()
    await this._store.setAppState(newState)
    if (newState === 'active' || newState === 'background' || newState === 'backgroundFromForeground') {
      await TextileEvents.appStateChange(previousState, newState)
    }
    if (newState === 'active' || newState === 'background') {
      await this.createAndStartNode()
    }
    if (newState === 'background' || newState === 'backgroundFromForeground') {
      await this.backgroundTaskRace()
    }
  }
  private initializeAppState = async () => {
    // Clear storage to fresh state
    await this._store.clear()

    const defaultAppState = 'unknown' as TextileAppStateStatus

    let queriedAppState = this.getCurrentState()
    while (queriedAppState.match(/unknown/)) {
      await delay(10)
      queriedAppState = await this.getCurrentState()
    }
    // Setup our within sdk listeners
    this._nativeEvents.addListener('onOnline', this.onOnlineCallback)

    DeviceEventEmitter.addListener(TextileEvents.privateEvents.backgroundTask, this.backgroundTaskCallback)

    // Mark as initialized
    this._initialized = true

    try {
      // Begin first node startup cycle
      await this.manageNode(defaultAppState, queriedAppState)

    } catch (error) {
      TextileEvents.newError(error.message, 'manageNode')
    } finally {
      // try to keep our app going...
      let missedAppState = this.getCurrentState()
      while (missedAppState.match(/unknown/)) {
        await delay(10)
        missedAppState = await this.getCurrentState()
      }

      // Create listeners for app state change to start/stop node
      if (this._config.SELF_MANAGE_APP_STATE) {
        // NOT DEFAULT, the developer can trigger changes manually via an notifyAppStateChange event
        DeviceEventEmitter.addListener('@textile/notifyAppStateChange', this.notifyAppStateChangeCallback)
      } else {
        // DEFAULT: SDK automatically detects app state changes manages the node
        AppState.addEventListener('change', this.nextStateCallback)
      }

      // There was a missed state change while we were in the startup sequence
      if (missedAppState !== queriedAppState) {
        const currentAppState = this.getCurrentState()
        // we should be safe to fire a duplicate here anyway...
        TextileEvents.appNextState(currentAppState)
        this.nextAppState(currentAppState)
      }
    }
  }

  private backgroundTaskCallback = async () => {
    const shouldRun = await this.shouldRunBackgroundTask()
    if (!shouldRun) {
      return
    }
    await this._store.setLastBackgroundEvent()
    const currentState = this.getCurrentState()
    // ensure we don't cause things in foreground
    if (currentState === 'background') {
      TextileEvents.appNextState('background')
      await this.nextAppState('background')
    }
  }

  private onOnlineCallback = () => {
    this._store.setNodeOnline(true)
  }
  private notifyAppStateChangeCallback = (payload: {nextState: AppStateStatus}) => {
    if (!payload || !payload.nextState) {
      return
    }
    TextileEvents.appNextState(payload.nextState)
    this.nextAppState(payload.nextState)
  }
  private createAndStartNodeCallback = () => {
    this.createAndStartNode()
  }
  private nextStateCallback = (nextState: AppStateStatus) => {
    TextileEvents.appNextState(nextState)
    this.nextAppState(nextState)
  }
  private shouldRunBackgroundTask = async (): Promise<boolean> => {
    const MINIMUM_MINUTES_BETWEEN_TASKS = 10
    const now = Number((new Date()).getTime())
    const last = await this._store.getLastBackgroundEvent()
    // previous time set and set too recently
    if (last && (now - last) < 1000 * 60 * MINIMUM_MINUTES_BETWEEN_TASKS) {
      return false
    }
    return true
  }

  private discoverCafes = async () => {
    if (this._cafe) {
      if (!this._initialized) {
        TextileEvents.nonInitializedError()
        return
      }
      const response = await fetch(`${this._cafe.TEXTILE_CAFE_GATEWAY_URL}/cafes`, { method: 'GET' })
      if (response.status < 200 || response.status > 299) {
        throw new Error(`Status code error: ${response.statusText}`)
      }
      const discoveredCafes = await response.json() as DiscoveredCafes
      return discoveredCafes
    } else {
      TextileEvents.newError('no cafe config provided', 'cafeConfigError')
    }
  }

  private updateNodeStateError = async (error: Error) => {
    const storedState = await this._store.getNodeState()
    const state = storedState && storedState.state || NodeState.nonexistent
    await this._store.setNodeState({state, error: error.message})
  }
  private nextAppState = async (nextState: AppStateStatus) => {
    try {
      const previousState = await this.appState()
      const newState: TextileAppStateStatus = nextState === 'background' && (
          previousState === 'active' || previousState === 'inactive'
      ) ? 'backgroundFromForeground' : nextState
      if (newState !== previousState || newState === 'background') {
        await this.manageNode(previousState, newState)
      }
    } catch (error) {
      TextileEvents.newError(error.message, 'nextAppState')
    }
  }

  private updateNodeState = async (state: NodeState) => {
    const pastState = await this._store.getNodeState()
    if (pastState && !pastState.error && pastState.state === state) {
      return
    }
    await this._store.setNodeState({state})
    TextileEvents.newNodeState(state)
  }

  /* ----- PRIVATE - EVENT EMITTERS ----- */
  private stopNode = async () => {
    await this.updateNodeState(NodeState.stopping)
    await this.stop()
    await this._store.setNodeOnline(false)
    await this.updateNodeState(NodeState.stopped)
  }

  private backgroundTaskRace = async () => {
    // This race cancels whichever effect looses the race, so a foreground event will cancel stopping the node
    //
    // Using the race effect, if we get a foreground event while we're waiting
    // to stop the node, cancel the stop and let it keep running
    await BackgroundTimer.start()
    try {
      const ms = 20000
      let cancelled = false

      const foregroundEvent = DeviceEventEmitter.addListener(TextileEvents.privateEvents.appNextState, (payload) => {
        if (payload.nextState === 'active' && !cancelled) {
          TextileEvents.stopNodeAfterDelayCancelled()
          cancelled = true
        }
      })

      cancelSequence:
      while (!cancelled) {
          TextileEvents.stopNodeAfterDelayStarting()
          await this.checkCafeMessages() // do a quick check for new messages
          await delay(ms / 2)
          if (cancelled) { // cancelled by event, so abort sequence
            foregroundEvent.remove() // remove our event listener
            break cancelSequence
          }
          await this.checkCafeMessages()
          await delay(ms / 2)
          if (cancelled) { // cancelled by event, so abort sequence
            foregroundEvent.remove() // remove our event listener
            break cancelSequence
          }
          // enter stopping sequence
          foregroundEvent.remove() // remove our event listener
          TextileEvents.stopNodeAfterDelayFinishing()
          await this.stopNode() // stop the node
          TextileEvents.stopNodeAfterDelayComplete()
          cancelled = true // be sure to exit the loop
      }
    } finally {
      // TODO: this might be better in a client provided callback
      await BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
      // Tells iOS that we are done with our background task so it's okay to suspend us
      await BackgroundTimer.stop()
    }
  }
}

export default Textile
