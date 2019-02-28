import {
  DeviceEventEmitter, EmitterSubscription
} from 'react-native'
import { NodeState, TextileAppStateStatus } from './Models'
import NativeEvents from '../NativeEvents'

// subscription keys that can be joined/left by client
export type TextileEvents = 'newNodeState' |
                            'createAndStartNode' |
                            'startNodeFinished' |
                            'stopNodeAfterDelayStarting' |
                            'stopNodeAfterDelayCancelled' |
                            'stopNodeAfterDelayFinishing' |
                            'stopNodeAfterDelayComplete' |
                            'appStateChange' |
                            'updateProfile' |
                            'newErrorMessage' |
                            'appNextState' |
                            'migrationNeeded' |
                            'setRecoveryPhrase' |
                            'walletInitSuccess' |
                            'backgroundTask' |
                            'nodeOnline' |
                            'error' |
                            'onOnline' |
                            'onThreadUpdate' |
                            'onThreadAdded' |
                            'onThreadRemoved' |
                            'onNotification' |
                            'onAccountPeerAdded' |
                            'onAccountPeerRemoved'

export const publicEvents: {[key: string]: string} = {
  newNodeState: '@textile/shared/newNodeState',
  createAndStartNode: '@textile/shared/createAndStartNode',
  startNodeFinished: '@textile/shared/startNodeFinished',
  stopNodeAfterDelayStarting: '@textile/shared/stopNodeAfterDelayStarting',
  stopNodeAfterDelayCancelled: '@textile/shared/stopNodeAfterDelayCancelled',
  stopNodeAfterDelayFinishing: '@textile/shared/stopNodeAfterDelayFinishing',
  stopNodeAfterDelayComplete: '@textile/shared/stopNodeAfterDelayComplete',
  appStateChange: '@textile/shared/appStateChange',
  updateProfile: '@textile/shared/updateProfile',
  newErrorMessage: '@textile/shared/newErrorMessage',
  appNextState: '@textile/shared/appNextState',
  migrationNeeded: '@textile/shared/migrationNeeded',
  setRecoveryPhrase: '@textile/shared/setRecoveryPhrase',
  walletInitSuccess: '@textile/shared/walletInitSuccess',
  backgroundTask: '@textile/shared/backgroundTask',
  error: '@textile/shared/error',
  // NATIVE EVENTS
  onOnline: 'onOnline',
  onThreadUpdate: 'onThreadUpdate',
  onThreadAdded: 'onThreadAdded',
  onThreadRemoved: 'onThreadRemoved',
  onNotification: 'onNotification',
  onAccountPeerAdded: 'onAccountPeerAdded',
  onAccountPeerRemoved: 'onAccountPeerRemoved'
}

const nativeEvents: TextileEvents[] = [
  'onThreadUpdate',
  'onThreadAdded',
  'onThreadRemoved',
  'onNotification',
  'onAccountPeerAdded',
  'onAccountPeerRemoved']

// Keys used only inside the SDK, not to be modified by the client
export const privateEvents: {[key: string]: string} = {
  backgroundTask: '@textile/internal/backgroundTask',
  createAndStartNode: '@textile/internal/createAndStartNode',
  appNextState: '@textile/internal/appNextState'
}

export function newError(message: string, type: string) {
  DeviceEventEmitter.emit(publicEvents.error, {type, message})
}

export function nonInitializedError() {
  newError('nonInitializedError', 'Error: Attempt to use a Textile method reserved for an initialized instance.')
}
export function backgroundTask () {
  DeviceEventEmitter.emit(privateEvents.backgroundTask)
  DeviceEventEmitter.emit(publicEvents.backgroundTask)
}

export function newNodeState (state: NodeState) {
  DeviceEventEmitter.emit(publicEvents.newNodeState, {state})
}
export function createAndStartNode () {
  DeviceEventEmitter.emit(privateEvents.createAndStartNode)
  DeviceEventEmitter.emit(publicEvents.createAndStartNode)
}

export function startNodeFinished () {
  DeviceEventEmitter.emit(publicEvents.startNodeFinished)
}

export function stopNodeAfterDelayStarting () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayStarting)
}

export function stopNodeAfterDelayCancelled () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayCancelled)
}

export function stopNodeAfterDelayFinishing () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayFinishing)
}

export function stopNodeAfterDelayComplete () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayComplete)
}
export function appStateChange (previousState: TextileAppStateStatus, newState: TextileAppStateStatus) {
  DeviceEventEmitter.emit(publicEvents.appStateChange, {previousState: previousState as string, newState: newState as string})
}

export function updateProfile () {
  DeviceEventEmitter.emit(publicEvents.updateProfile)
}
export function walletInitSuccess () {
  DeviceEventEmitter.emit(publicEvents.walletInitSuccess)
}

export function setRecoveryPhrase (recoveryPhrase: string) {
  DeviceEventEmitter.emit(publicEvents.setRecoveryPhrase, {recoveryPhrase})
}
export function migrationNeeded () {
  DeviceEventEmitter.emit(publicEvents.migrationNeeded)
}

export function appNextState (nextState: string) {
  DeviceEventEmitter.emit(privateEvents.appNextState, {nextState})
  DeviceEventEmitter.emit(publicEvents.appNextState, {nextState})
}

class Events {

  subscriptions: EmitterSubscription[] = []

  addListener = (type: TextileEvents, listener: (data: any) => void, context?: any): EmitterSubscription => {
    if (Object.keys(publicEvents).indexOf(type) >= 0) {
      if (nativeEvents.indexOf(type) >= 0) {
        const event = NativeEvents.addListener(type, listener)
        this.subscriptions.push(event)
        return event
      } else {
        const event = DeviceEventEmitter.addListener(publicEvents[type as string], listener, context)
        this.subscriptions.push(event)
        return event
      }
    }
    throw new Error(`@textile/react-native-sdk: no event type: ${type}`)
  }

  removeListener = (type: TextileEvents, listener: (data: any) => void) => {
    if (Object.keys(publicEvents).indexOf(type) >= 0) {
      if (nativeEvents.indexOf(type) >= 0) {
        NativeEvents.removeListener(type, listener)
      } else {
        DeviceEventEmitter.removeListener(publicEvents[type as string], listener)
      }
    }
    throw new Error(`@textile/react-native-sdk: no event type: ${type}`)
  }

  removeAllListeners = () => {
    for (const subscription of this.subscriptions) {
      subscription.remove()
    }
    this.subscriptions = []
  }
}

export default Events
