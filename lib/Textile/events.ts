import {
  DeviceEventEmitter, EmitterSubscription
} from 'react-native'
import NativeEvents from '../NativeEvents'
import { backgroundTask as internalBackgroundTask } from './internalEvents'

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
                            'error' |
                            'NODE_START' | 'NODE_ONLINE' | 'NODE_STOP' | 'WALLET_UPDATE' | 'THREAD_UPDATE' | 'NOTIFICATION' | 'QUERY_RESPONSE'

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
  NODE_START: 'NODE_START',
  NODE_ONLINE: 'NODE_ONLINE',
  NODE_STOP: 'NODE_STOP',
  WALLET_UPDATE: 'WALLET_UPDATE',
  THREAD_UPDATE: 'THREAD_UPDATE',
  NOTIFICATION: 'NOTIFICATION',
  QUERY_RESPONSE: 'QUERY_RESPONSE'
}

const nativeEvents: TextileEvents[] = ['NODE_START', 'NODE_ONLINE', 'NODE_STOP', 'WALLET_UPDATE', 'THREAD_UPDATE', 'NOTIFICATION', 'QUERY_RESPONSE']

/**
 * Notify Textile at the start of a new background sessions.
 *
 * ```typescript
 * import { BackgroundTask } from '@textile/react-native-sdk';
 *
 * BackgroundTask();
 * ```
 */
export function BackgroundTask () {
  internalBackgroundTask()
}

class Events {

  subscriptions: EmitterSubscription[] = []

  /**
   * Subscribe to any TextileEvent
   *
   * Events listeners can be added anywhere in your app, as long as the primary Textile.setup step is run somewhere too.
   *
   * ```typescript
   * import { Events } from '@textile/react-native-sdk';
   *
   * const textileEvents = Events()
   * textileEvents.addListener('newNodeState', function(payload) {
   *    // Handle new node state.
   * });
   * ```
   */
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
    } else {
      throw new Error(`@textile/react-native-sdk: no event type: ${type}`)
    }
  }

  /**
   * Remove any existing listener.
   */
  removeListener = (type: TextileEvents, listener: (data: any) => void) => {
    if (Object.keys(publicEvents).indexOf(type) >= 0) {
      if (nativeEvents.indexOf(type) >= 0) {
        NativeEvents.removeListener(type, listener)
      } else {
        DeviceEventEmitter.removeListener(publicEvents[type as string], listener)
      }
    } else {
      throw new Error(`@textile/react-native-sdk: no event type: ${type}`)
    }
  }

  /**
   * Remove all listeners
   */
  removeAllListeners = () => {
    for (const subscription of this.subscriptions) {
      subscription.remove()
    }
    this.subscriptions = []
  }
}

export default Events
