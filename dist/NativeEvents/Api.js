"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { Events } = react_native_1.NativeModules;
exports.eventEmitter = react_native_1.Platform.select({
    android: react_native_1.DeviceEventEmitter,
    ios: new react_native_1.NativeEventEmitter(Events)
});
