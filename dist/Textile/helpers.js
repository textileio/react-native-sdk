"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHMS() {
    const now = new Date();
    return [
        now.getHours().toString(),
        now.getMinutes().toString(),
        now.getSeconds().toString()
    ].join(':');
}
exports.getHMS = getHMS;
function createTimeout(ms, promise) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('timeout'));
        }, ms);
        promise.then(resolve, reject);
    });
}
exports.createTimeout = createTimeout;
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
exports.delay = delay;
