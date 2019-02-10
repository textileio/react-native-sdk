"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.publicEvents = {
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
    nodeOnline: '@textile/shared/nodeOnline',
    error: '@textile/shared/error'
};
// Keys used only inside the SDK, not to be modified by the client
exports.privateEvents = {
    backgroundTask: '@textile/internal/backgroundTask',
    createAndStartNode: '@textile/internal/createAndStartNode',
    appNextState: '@textile/internal/appNextState'
};
function newError(message, type) {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.error, { type, message });
}
exports.newError = newError;
function nonInitializedError() {
    newError('nonInitializedError', 'Error: Attempt to use a Textile method reserved for an initialized instance.');
}
exports.nonInitializedError = nonInitializedError;
function backgroundTask() {
    react_native_1.DeviceEventEmitter.emit(exports.privateEvents.backgroundTask);
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.backgroundTask);
}
exports.backgroundTask = backgroundTask;
function newNodeState(state) {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.newNodeState, { state });
}
exports.newNodeState = newNodeState;
function createAndStartNode() {
    react_native_1.DeviceEventEmitter.emit(exports.privateEvents.createAndStartNode);
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.createAndStartNode);
}
exports.createAndStartNode = createAndStartNode;
function startNodeFinished() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.startNodeFinished);
}
exports.startNodeFinished = startNodeFinished;
function stopNodeAfterDelayStarting() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.stopNodeAfterDelayStarting);
}
exports.stopNodeAfterDelayStarting = stopNodeAfterDelayStarting;
function stopNodeAfterDelayCancelled() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.stopNodeAfterDelayCancelled);
}
exports.stopNodeAfterDelayCancelled = stopNodeAfterDelayCancelled;
function stopNodeAfterDelayFinishing() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.stopNodeAfterDelayFinishing);
}
exports.stopNodeAfterDelayFinishing = stopNodeAfterDelayFinishing;
function stopNodeAfterDelayComplete() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.stopNodeAfterDelayComplete);
}
exports.stopNodeAfterDelayComplete = stopNodeAfterDelayComplete;
function appStateChange(previousState, newState) {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.appStateChange, { previousState: previousState, newState: newState });
}
exports.appStateChange = appStateChange;
function updateProfile() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.updateProfile);
}
exports.updateProfile = updateProfile;
function walletInitSuccess() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.walletInitSuccess);
}
exports.walletInitSuccess = walletInitSuccess;
function setRecoveryPhrase(recoveryPhrase) {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.setRecoveryPhrase, { recoveryPhrase });
}
exports.setRecoveryPhrase = setRecoveryPhrase;
function migrationNeeded() {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.migrationNeeded);
}
exports.migrationNeeded = migrationNeeded;
function appNextState(nextState) {
    react_native_1.DeviceEventEmitter.emit(exports.privateEvents.appNextState, { nextState });
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.appNextState, { nextState });
}
exports.appNextState = appNextState;
function nodeOnline(online) {
    react_native_1.DeviceEventEmitter.emit(exports.publicEvents.nodeOnline, { online });
}
exports.nodeOnline = nodeOnline;
class Events {
    constructor() {
        this.deviceEvents = [];
        this.addListener = (type, listener, context) => {
            if (Object.keys(exports.publicEvents).indexOf(type) >= 0) {
                const event = react_native_1.DeviceEventEmitter.addListener(exports.publicEvents[type], listener, context);
                this.deviceEvents.push(event);
                return event;
            }
            throw new Error(`@textile/react-native-sdk: no event type: ${type}`);
        };
        this.removeListener = (type, listener) => {
            if (Object.keys(exports.publicEvents).indexOf(type) >= 0) {
                react_native_1.DeviceEventEmitter.removeListener(exports.publicEvents[type], listener);
            }
            throw new Error(`@textile/react-native-sdk: no event type: ${type}`);
        };
        this.removeAllListeners = () => {
            for (const subscription of this.deviceEvents) {
                subscription.remove();
            }
            this.deviceEvents = [];
        };
    }
}
exports.default = Events;
