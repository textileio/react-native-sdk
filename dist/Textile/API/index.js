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
const buffer_1 = require("buffer");
const react_native_protobufs_1 = require("@textile/react-native-protobufs");
const { TextileNode } = react_native_1.NativeModules;
class API {
    constructor() {
        /**
         * Returns the hash of the initial join block. Not the threadId of the final thread created/joined
         */
        this.acceptExternalThreadInvite = (id_, key) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.acceptExternalThreadInvite(id_, key); // returns hash
            return result;
        });
        this.acceptThreadInviteViaNotification = (id_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.acceptThreadInviteViaNotification(id_); // returns addr
            return result;
        });
        this.addContact = (contact) => __awaiter(this, void 0, void 0, function* () {
            const contactJsonString = JSON.stringify(contact);
            yield TextileNode.addContact(contactJsonString);
        });
        this.addExternalThreadInvite = (threadId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addExternalThreadInvite(threadId);
            return JSON.parse(result);
        });
        this.addSchema = (jsonstr) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addSchema(jsonstr);
            return JSON.parse(result);
        });
        this.addThread = (key, name, shared) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addThread(key, name, shared);
            return JSON.parse(result);
        });
        this.addThreadComment = (blockId, body) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addThreadComment(blockId, body); // returns hash
            return result;
        });
        this.addThreadFiles = (dir, threadId, caption) => __awaiter(this, void 0, void 0, function* () {
            const byteArray = react_native_protobufs_1.Directory.encode(dir).finish();
            const buffer = buffer_1.Buffer.from(byteArray);
            const base64 = buffer.toString('base64');
            const result = yield TextileNode.addThreadFiles(base64, threadId, caption);
            return JSON.parse(result);
        });
        this.addThreadFilesByTarget = (target, threadId, caption) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addThreadFilesByTarget(target, threadId, caption);
            return JSON.parse(result);
        });
        this.addThreadIgnore = (blockId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addThreadIgnore(blockId); // returns hash
            return result;
        });
        this.addThreadInvite = (threadId, inviteeId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addThreadInvite(threadId, inviteeId); // returns hash
            return result;
        });
        this.addThreadLike = (blockId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addThreadLike(blockId); // returns hash
            return result;
        });
        this.addThreadMessage = (threadId, body) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.addThreadMessage(threadId, body); // returns hash
            return result;
        });
        this.address = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.address();
            return result;
        });
        this.avatar = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.avatar();
            return result.length > 0 ? result : undefined;
        });
        this.cafeSession = (peerId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.cafeSession(peerId);
            if (!result) {
                return undefined;
            }
            const buffer = buffer_1.Buffer.from(result, 'base64');
            return react_native_protobufs_1.CafeSession.decode(buffer);
        });
        this.cafeSessions = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.cafeSessions();
            if (!result) {
                return undefined;
            }
            const buffer = buffer_1.Buffer.from(result, 'base64');
            return react_native_protobufs_1.CafeSessions.decode(buffer);
        });
        this.checkCafeMessages = () => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.checkCafeMessages();
        });
        this.contact = (id_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.contact(id_);
            return JSON.parse(result);
        });
        this.contactThreads = (id_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.contactThreads(id_);
            return JSON.parse(result);
        });
        this.contacts = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.contacts();
            return JSON.parse(result);
        });
        this.countUnreadNotifications = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.countUnreadNotifications();
            return result;
        });
        this.deregisterCafe = (peerId) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.deregisterCafe(peerId);
        });
        this.fileData = (hash) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.fileData(hash);
            return JSON.parse(result);
        });
        this.findContact = (username, limit, wait) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.findContact(username, limit, wait);
            return JSON.parse(result);
        });
        this.ignoreThreadInviteViaNotification = (id_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.ignoreThreadInviteViaNotification(id_);
            return result;
        });
        // Note: pth is <target>/<index>, e.g., "Qm.../0"
        this.imageFileDataForMinWidth = (pth, minWidth) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.imageFileDataForMinWidth(pth, minWidth);
            return JSON.parse(result);
        });
        this.notifications = (offset, limit) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.notifications(offset, limit);
            return JSON.parse(result);
        });
        this.overview = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.overview();
            return JSON.parse(result);
        });
        this.peerId = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.peerId();
            return result;
        });
        this.prepareFiles = (path, threadId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.prepareFiles(path, threadId);
            const buffer = buffer_1.Buffer.from(result, 'base64');
            return react_native_protobufs_1.MobilePreparedFiles.decode(buffer);
        });
        this.prepareFilesAsync = (path, threadId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.prepareFilesAsync(path, threadId);
            const buffer = buffer_1.Buffer.from(result, 'base64');
            return react_native_protobufs_1.MobilePreparedFiles.decode(buffer);
        });
        this.profile = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.profile();
            return JSON.parse(result);
        });
        this.readAllNotifications = () => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.readAllNotifications();
        });
        this.readNotification = (id_) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.readNotification(id_);
        });
        this.refreshCafeSession = (peerId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.refreshCafeSession(peerId);
            if (!result) {
                return undefined;
            }
            const buffer = buffer_1.Buffer.from(result, 'base64');
            return react_native_protobufs_1.CafeSession.decode(buffer);
        });
        this.registerCafe = (peerId, token) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.registerCafe(peerId, token);
        });
        this.removeThread = (id_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.removeThread(id_); // returns hash b58 string
            return result;
        });
        this.seed = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.seed();
            return result;
        });
        this.setAvatar = (id_) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.setAvatar(id_);
        });
        this.setLogLevels = (levels) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.setLogLevels(levels);
        });
        this.setUsername = (username) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.setUsername(username);
        });
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.start();
        });
        this.stop = () => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.stop();
        });
        this.threadFeed = (offset, limit, threadId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.threadFeed(offset, limit, threadId);
            return JSON.parse(result);
        });
        this.threadFiles = (offset, limit, threadId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.threadFiles(offset, limit, threadId);
            return JSON.parse(result);
        });
        this.threadMessages = (offset, limit, threadId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.threadMessages(offset, limit, threadId);
            return JSON.parse(result);
        });
        this.threadInfo = (threadId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.threadInfo(threadId);
            return JSON.parse(result);
        });
        this.threads = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.threads();
            return JSON.parse(result);
        });
        this.username = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.username();
            return result.length > 0 ? result : undefined;
        });
        this.version = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.version();
            return result;
        });
        // Order of things to init and create the repo:
        // MobileNewTextile If error, inspect it and run next steps or migration
        // MobileNewWallet returns recovery phrase
        // MobileWalletAccountAt returns seed and address
        // MobileInitRepo only run one time ever
        // MobileNewTextile
        this.initRepo = (seed, repoPath, logToDisk, debug) => __awaiter(this, void 0, void 0, function* () {
            return yield TextileNode.initRepo(seed, repoPath, logToDisk, debug);
        });
        this.migrateRepo = (repoPath) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.migrateRepo(repoPath);
        });
        this.newTextile = (repoPath, debug) => __awaiter(this, void 0, void 0, function* () {
            yield TextileNode.newTextile(repoPath, debug);
        });
        this.newWallet = (wordCount) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.newWallet(wordCount);
            return result;
        });
        this.walletAccountAt = (phrase, index, password) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TextileNode.walletAccountAt(phrase, index, password); // return seed and address
            return JSON.parse(result);
        });
    }
}
exports.default = API;
