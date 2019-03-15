
import {
  DeviceEventEmitter, EmitterSubscription
} from 'react-native'
import { NodeState, TextileAppStateStatus } from './Models'
import { publicEvents } from './events'

// Keys used only inside the SDK, not to be modified by the client
export const privateEvents: {[key: string]: string} = {
  backgroundTask: '@textile/internal/backgroundTask',
  createAndStartNode: '@textile/internal/createAndStartNode',
  appNextState: '@textile/internal/appNextState'
}

/* tslint:disable-next-line:completed-docs */
export function newError(message: string, type: string) {
  DeviceEventEmitter.emit(publicEvents.error, {type, message})
}
/* tslint:disable-next-line:completed-docs */
export function nonInitializedError() {
  newError('nonInitializedError', 'Error: Attempt to use a Textile method reserved for an initialized instance.')
}
/* tslint:disable-next-line:completed-docs */
export function backgroundTask () {
  DeviceEventEmitter.emit(privateEvents.backgroundTask)
  DeviceEventEmitter.emit(publicEvents.backgroundTask)
}
/* tslint:disable-next-line:completed-docs */
export function newNodeState (state: NodeState) {
  DeviceEventEmitter.emit(publicEvents.newNodeState, {state})
}
/* tslint:disable-next-line:completed-docs */
export function createAndStartNode () {
  DeviceEventEmitter.emit(privateEvents.createAndStartNode)
  DeviceEventEmitter.emit(publicEvents.createAndStartNode)
}
/* tslint:disable-next-line:completed-docs */
export function startNodeFinished () {
  DeviceEventEmitter.emit(publicEvents.startNodeFinished)
}
/* tslint:disable-next-line:completed-docs */
export function stopNodeAfterDelayStarting () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayStarting)
}
/* tslint:disable-next-line:completed-docs */
export function stopNodeAfterDelayCancelled () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayCancelled)
}
/* tslint:disable-next-line:completed-docs */
export function stopNodeAfterDelayFinishing () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayFinishing)
}
/* tslint:disable-next-line:completed-docs */
export function stopNodeAfterDelayComplete () {
  DeviceEventEmitter.emit(publicEvents.stopNodeAfterDelayComplete)
}
/* tslint:disable-next-line:completed-docs */
export function appStateChange (previousState: TextileAppStateStatus, newState: TextileAppStateStatus) {
  DeviceEventEmitter.emit(publicEvents.appStateChange, {previousState: previousState as string, newState: newState as string})
}
/* tslint:disable-next-line:completed-docs */
export function updateProfile () {
  DeviceEventEmitter.emit(publicEvents.updateProfile)
}
/* tslint:disable-next-line:completed-docs */
export function walletInitSuccess () {
  DeviceEventEmitter.emit(publicEvents.walletInitSuccess)
}
/* tslint:disable-next-line:completed-docs */
export function setRecoveryPhrase (recoveryPhrase: string) {
  DeviceEventEmitter.emit(publicEvents.setRecoveryPhrase, {recoveryPhrase})
}
/* tslint:disable-next-line:completed-docs */
export function migrationNeeded () {
  DeviceEventEmitter.emit(publicEvents.migrationNeeded)
}
/* tslint:disable-next-line:completed-docs */
export function appNextState (nextState: string) {
  DeviceEventEmitter.emit(privateEvents.appNextState, {nextState})
  DeviceEventEmitter.emit(publicEvents.appNextState, {nextState})
}
