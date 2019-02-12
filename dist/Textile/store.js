"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class TextileStore {
    constructor() {
        this.keys = {
            appState: '@textile/appState',
            profile: '@textile/profile',
            peerId: '@textile/peerId',
            sdkVersion: '@textile/sdkVersion',
            nodeOnline: '@textile/nodeOnline',
            nodeState: '@textile/nodeState',
            lastBackgroundEvent: '@textile/lastBackgroundEvent'
        };
        this.clear = () => __awaiter(this, void 0, void 0, function* () {
            // clears only sdk related keys so that any client keys are untouched
            const storeKeys = Object.keys(this.keys).map((key) => this.keys[key]);
            yield react_native_1.AsyncStorage.multiRemove(storeKeys);
        });
        this.serialize = (data) => {
            return JSON.stringify(data);
        };
        this.getLastBackgroundEvent = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield react_native_1.AsyncStorage.getItem(this.keys.lastBackgroundEvent);
            if (result) {
                return Number(result);
            }
            return;
        });
        this.getAppState = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield react_native_1.AsyncStorage.getItem(this.keys.appState);
            if (result) {
                return JSON.parse(result);
            }
            return;
        });
        this.getNodeOnline = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield react_native_1.AsyncStorage.getItem(this.keys.nodeOnline);
            if (result) {
                return JSON.parse(result);
            }
            return;
        });
        this.getNodeState = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield react_native_1.AsyncStorage.getItem(this.keys.nodeState);
            if (result) {
                return JSON.parse(result);
            }
            return;
        });
        this.setLastBackgroundEvent = () => __awaiter(this, void 0, void 0, function* () {
            // store epoch in milliseconds
            const now = Math.floor((new Date()).getTime()).toString();
            yield react_native_1.AsyncStorage.setItem(this.keys.lastBackgroundEvent, now);
        });
        this.setAppState = (newState) => __awaiter(this, void 0, void 0, function* () {
            yield react_native_1.AsyncStorage.setItem(this.keys.appState, this.serialize(newState));
        });
        this.setNodeOnline = (online) => __awaiter(this, void 0, void 0, function* () {
            yield react_native_1.AsyncStorage.setItem(this.keys.nodeOnline, this.serialize(online));
        });
        this.setNodeState = (item) => __awaiter(this, void 0, void 0, function* () {
            yield react_native_1.AsyncStorage.setItem(this.keys.nodeState, this.serialize(item));
        });
    }
}
exports.default = TextileStore;
