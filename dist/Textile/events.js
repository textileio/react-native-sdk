"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.keys = {
    newNodeState: '@textile/newNodeState',
    createAndStartNode: '@textile/createAndStartNode',
    startNodeFinished: '@textile/startNodeFinished',
    stopNodeAfterDelayStarting: '@textile/stopNodeAfterDelayStarting',
    stopNodeAfterDelayCancelled: '@textile/stopNodeAfterDelayCancelled',
    stopNodeAfterDelayFinishing: '@textile/stopNodeAfterDelayFinishing',
    stopNodeAfterDelayComplete: '@textile/stopNodeAfterDelayComplete',
    appStateChange: '@textile/appStateChange',
    updateProfile: '@textile/updateProfile',
    newErrorMessage: '@textile/newErrorMessage',
    appNextState: '@textile/appNextState',
    migrationNeeded: '@textile/migrationNeeded',
    setRecoveryPhrase: '@textile/setRecoveryPhrase',
    walletInitSuccess: '@textile/walletInitSuccess',
    error: '@textile/error'
};
function newError(message, type) {
    react_native_1.DeviceEventEmitter.emit(exports.keys.error, { type, message });
}
exports.newError = newError;
function nonInitializedError() {
    newError('nonInitializedError', 'Error: Attempt to use a Textile method reserved for an initialized instance.');
}
exports.nonInitializedError = nonInitializedError;
function newNodeState(state) {
    react_native_1.DeviceEventEmitter.emit(exports.keys.newNodeState, { state });
}
exports.newNodeState = newNodeState;
function createAndStartNode() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.createAndStartNode);
}
exports.createAndStartNode = createAndStartNode;
function startNodeFinished() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.startNodeFinished);
}
exports.startNodeFinished = startNodeFinished;
function stopNodeAfterDelayStarting() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.stopNodeAfterDelayStarting);
}
exports.stopNodeAfterDelayStarting = stopNodeAfterDelayStarting;
function stopNodeAfterDelayCancelled() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.stopNodeAfterDelayCancelled);
}
exports.stopNodeAfterDelayCancelled = stopNodeAfterDelayCancelled;
function stopNodeAfterDelayFinishing() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.stopNodeAfterDelayFinishing);
}
exports.stopNodeAfterDelayFinishing = stopNodeAfterDelayFinishing;
function stopNodeAfterDelayComplete() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.stopNodeAfterDelayComplete);
}
exports.stopNodeAfterDelayComplete = stopNodeAfterDelayComplete;
function appStateChange(previousState, newState) {
    react_native_1.DeviceEventEmitter.emit(exports.keys.appStateChange, { previousState, newState });
}
exports.appStateChange = appStateChange;
function newErrorMessage(error) {
    react_native_1.DeviceEventEmitter.emit(exports.keys.newErrorMessage, { error });
}
exports.newErrorMessage = newErrorMessage;
function updateProfile() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.updateProfile);
}
exports.updateProfile = updateProfile;
function walletInitSuccess() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.walletInitSuccess);
}
exports.walletInitSuccess = walletInitSuccess;
function setRecoveryPhrase(recoveryPhrase) {
    react_native_1.DeviceEventEmitter.emit(exports.keys.setRecoveryPhrase, { recoveryPhrase });
}
exports.setRecoveryPhrase = setRecoveryPhrase;
function migrationNeeded() {
    react_native_1.DeviceEventEmitter.emit(exports.keys.migrationNeeded);
}
exports.migrationNeeded = migrationNeeded;
function appNextState(nextState) {
    react_native_1.DeviceEventEmitter.emit(exports.keys.appNextState, { nextState });
}
exports.appNextState = appNextState;
