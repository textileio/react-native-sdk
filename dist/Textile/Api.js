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
/**
 * Returns the hash of the initial join block. Not the threadId of the final thread created/joined
 */
function acceptExternalThreadInvite(id_, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.acceptExternalThreadInvite(id_, key); // returns hash
        return result;
    });
}
exports.acceptExternalThreadInvite = acceptExternalThreadInvite;
function acceptThreadInviteViaNotification(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.acceptThreadInviteViaNotification(id_); // returns addr
        return result;
    });
}
exports.acceptThreadInviteViaNotification = acceptThreadInviteViaNotification;
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const contactJsonString = JSON.stringify(contact);
        yield TextileNode.addContact(contactJsonString);
    });
}
exports.addContact = addContact;
function addExternalThreadInvite(threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addExternalThreadInvite(threadId);
        return JSON.parse(result);
    });
}
exports.addExternalThreadInvite = addExternalThreadInvite;
function addSchema(jsonstr) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addSchema(jsonstr);
        return JSON.parse(result);
    });
}
exports.addSchema = addSchema;
function addThread(key, name, shared) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addThread(key, name, shared);
        return JSON.parse(result);
    });
}
exports.addThread = addThread;
function addThreadComment(blockId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addThreadComment(blockId, body); // returns hash
        return result;
    });
}
exports.addThreadComment = addThreadComment;
function addThreadFiles(dir, threadId, caption) {
    return __awaiter(this, void 0, void 0, function* () {
        const byteArray = react_native_protobufs_1.Directory.encode(dir).finish();
        const buffer = buffer_1.Buffer.from(byteArray);
        const base64 = buffer.toString('base64');
        const result = yield TextileNode.addThreadFiles(base64, threadId, caption);
        return JSON.parse(result);
    });
}
exports.addThreadFiles = addThreadFiles;
function addThreadFilesByTarget(target, threadId, caption) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addThreadFilesByTarget(target, threadId, caption);
        return JSON.parse(result);
    });
}
exports.addThreadFilesByTarget = addThreadFilesByTarget;
function addThreadIgnore(blockId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addThreadIgnore(blockId); // returns hash
        return result;
    });
}
exports.addThreadIgnore = addThreadIgnore;
function addThreadInvite(threadId, inviteeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addThreadInvite(threadId, inviteeId); // returns hash
        return result;
    });
}
exports.addThreadInvite = addThreadInvite;
function addThreadLike(blockId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.addThreadLike(blockId); // returns hash
        return result;
    });
}
exports.addThreadLike = addThreadLike;
function address() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.address();
        return result;
    });
}
exports.address = address;
function avatar() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.avatar();
        return result.length > 0 ? result : undefined;
    });
}
exports.avatar = avatar;
function cafeSession(peerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.cafeSession(peerId);
        return JSON.parse(result);
    });
}
exports.cafeSession = cafeSession;
function cafeSessions() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.cafeSessions();
        return JSON.parse(result);
    });
}
exports.cafeSessions = cafeSessions;
function checkCafeMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.checkCafeMessages();
    });
}
exports.checkCafeMessages = checkCafeMessages;
function contact(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.contact(id_);
        return JSON.parse(result);
    });
}
exports.contact = contact;
function contactThreads(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.contactThreads(id_);
        return JSON.parse(result);
    });
}
exports.contactThreads = contactThreads;
function contacts() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.contacts();
        return JSON.parse(result);
    });
}
exports.contacts = contacts;
function countUnreadNotifications() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.countUnreadNotifications();
        return result;
    });
}
exports.countUnreadNotifications = countUnreadNotifications;
function deregisterCafe(peerId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.deregisterCafe(peerId);
    });
}
exports.deregisterCafe = deregisterCafe;
// TODO: Use this to get image data
function fileData(hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.fileData(hash);
        return JSON.parse(result);
    });
}
exports.fileData = fileData;
function findContact(username, limit, wait) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.findContact(username, limit, wait);
        return JSON.parse(result);
    });
}
exports.findContact = findContact;
function ignoreThreadInviteViaNotification(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.ignoreThreadInviteViaNotification(id_);
        return result;
    });
}
exports.ignoreThreadInviteViaNotification = ignoreThreadInviteViaNotification;
// Note: pth is <target>/<index>, e.g., "Qm.../0"
function imageFileDataForMinWidth(pth, minWidth) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.imageFileDataForMinWidth(pth, minWidth);
        return JSON.parse(result);
    });
}
exports.imageFileDataForMinWidth = imageFileDataForMinWidth;
function notifications(offset, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.notifications(offset, limit);
        return JSON.parse(result);
    });
}
exports.notifications = notifications;
function overview() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.overview();
        return JSON.parse(result);
    });
}
exports.overview = overview;
function peerId() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.peerId();
        return result;
    });
}
exports.peerId = peerId;
function prepareFiles(path, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.prepareFiles(path, threadId);
        const buffer = buffer_1.Buffer.from(result, 'base64');
        return react_native_protobufs_1.MobilePreparedFiles.decode(buffer);
    });
}
exports.prepareFiles = prepareFiles;
function prepareFilesAsync(path, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.prepareFilesAsync(path, threadId);
        const buffer = buffer_1.Buffer.from(result, 'base64');
        return react_native_protobufs_1.MobilePreparedFiles.decode(buffer);
    });
}
exports.prepareFilesAsync = prepareFilesAsync;
function profile() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.profile();
        return JSON.parse(result);
    });
}
exports.profile = profile;
function readAllNotifications() {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.readAllNotifications();
    });
}
exports.readAllNotifications = readAllNotifications;
function readNotification(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.readNotification(id_);
    });
}
exports.readNotification = readNotification;
function refreshCafeSession(cafeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.refreshCafeSession(cafeId);
        return JSON.parse(result);
    });
}
exports.refreshCafeSession = refreshCafeSession;
function registerCafe(peerId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.registerCafe(peerId);
    });
}
exports.registerCafe = registerCafe;
function removeThread(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.removeThread(id_); // returns hash b58 string
        return result;
    });
}
exports.removeThread = removeThread;
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.seed();
        return result;
    });
}
exports.seed = seed;
function setAvatar(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.setAvatar(id_);
    });
}
exports.setAvatar = setAvatar;
function setUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.setUsername(username);
    });
}
exports.setUsername = setUsername;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.start();
    });
}
exports.start = start;
function stop() {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.stop();
    });
}
exports.stop = stop;
// TODO: How to pass undefined values?
function threadFiles(offset, limit, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.threadFiles(offset, limit, threadId);
        return JSON.parse(result);
    });
}
exports.threadFiles = threadFiles;
function threadInfo(threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.threadInfo(threadId);
        return JSON.parse(result);
    });
}
exports.threadInfo = threadInfo;
function threads() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.threads();
        return JSON.parse(result);
    });
}
exports.threads = threads;
function username() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.username();
        return result.length > 0 ? result : undefined;
    });
}
exports.username = username;
function version() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.version();
        return result;
    });
}
exports.version = version;
// Order of things to init and create the repo:
// MobileNewTextile If error, inspect it and run next steps or migration
// MobileNewWallet returns recovery phrase
// MobileWalletAccountAt returns seed and address
// MobileInitRepo only run one time ever
// MobileNewTextile
function initRepo(seed, repoPath, logToDisk) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield TextileNode.initRepo(seed, repoPath, logToDisk);
    });
}
exports.initRepo = initRepo;
function migrateRepo(repoPath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.migrateRepo(repoPath);
    });
}
exports.migrateRepo = migrateRepo;
function newTextile(repoPath, logLevels) {
    return __awaiter(this, void 0, void 0, function* () {
        yield TextileNode.newTextile(repoPath, logLevels);
    });
}
exports.newTextile = newTextile;
function newWallet(wordCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.newWallet(wordCount);
        return result;
    });
}
exports.newWallet = newWallet;
function walletAccountAt(phrase, index, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield TextileNode.walletAccountAt(phrase, index, password); // return seed and address
        return JSON.parse(result);
    });
}
exports.walletAccountAt = walletAccountAt;
