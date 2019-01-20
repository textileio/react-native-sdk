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
const Api_1 = require("../Api");
const threadId = 'QmdNgTtH468cqZFzXCi4sVSWTbJMWQbhYb8cBVyikP9LzW';
const threadKey = 'VsHHHz8bC8fu9k78RaX8ujQsUzGzaUxwKJyLFKKDacUZoWJaouGnzUQwgmh5';
const threadName = 'Great Name';
const shared = true;
describe('textile api', () => {
    describe('thread invites', () => {
        it('accept external thread invite', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield Api_1.acceptExternalThreadInvite(threadId, threadKey);
            expect(result).toEqual('SUCCESS');
        }));
        it('add thread invite via notification', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield Api_1.acceptThreadInviteViaNotification(threadId);
            expect(result).toEqual('SUCCESS');
        }));
        it('add external thread invite', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield Api_1.addExternalThreadInvite(threadId);
            expect(typeof result).toEqual('object');
            expect(result).toHaveProperty('id');
            expect(result.id).toEqual(threadId);
        }));
    });
    describe('threads', () => {
        it('addSchema', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield Api_1.addSchema('{}');
            expect(typeof result).toEqual('object');
            expect(result).toHaveProperty('mill');
        }));
        it('addThread', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield Api_1.addThread(threadKey, threadName, shared);
            expect(typeof result).toEqual('object');
            expect(result).toHaveProperty('key');
            expect(result.key).toEqual(threadKey);
            expect(result).toHaveProperty('name');
            expect(result.name).toEqual(threadName);
        }));
        it('addThreadFiles', () => __awaiter(this, void 0, void 0, function* () {
            const dir = {};
            const result = yield Api_1.addThreadFiles(dir, threadId, 'here we go');
            expect(typeof result).toEqual('object');
            expect(result).toHaveProperty('thread_id');
            expect(result.thread_id).toEqual(threadId);
        }));
    });
});
