"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeState;
(function (NodeState) {
    NodeState["nonexistent"] = "nonexistent";
    NodeState["creating"] = "creating";
    NodeState["created"] = "created";
    NodeState["starting"] = "starting";
    NodeState["started"] = "started";
    NodeState["stopping"] = "stopping";
    NodeState["stopped"] = "stopped";
    NodeState["creatingWallet"] = "creatingWallet";
    NodeState["derivingAccount"] = "derivingAccount";
    NodeState["initializingRepo"] = "initializingRepo";
    NodeState["walletInitSuccess"] = "walletInitSuccess";
    NodeState["postMigration"] = "postMigration";
})(NodeState = exports.NodeState || (exports.NodeState = {}));
var ThreadFeedItemType;
(function (ThreadFeedItemType) {
    ThreadFeedItemType["join"] = "join";
    ThreadFeedItemType["leave"] = "leave";
    ThreadFeedItemType["files"] = "files";
    ThreadFeedItemType["message"] = "message";
})(ThreadFeedItemType = exports.ThreadFeedItemType || (exports.ThreadFeedItemType = {}));
var BlockType;
(function (BlockType) {
    BlockType["MERGE"] = "MERGE";
    BlockType["IGNORE"] = "IGNORE";
    BlockType["FLAG"] = "FLAG";
    BlockType["JOIN"] = "JOIN";
    BlockType["ANNOUNCE"] = "ANNOUNCE";
    BlockType["LEAVE"] = "LEAVE";
    BlockType["MESSAGE"] = "MESSAGE";
    BlockType["FILES"] = "FILES";
    BlockType["COMMENT"] = "COMMENT";
    BlockType["LIKE"] = "LIKE";
    BlockType["INVALID"] = "INVALID";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["InviteReceivedNotification"] = "INVITE_RECEIVED";
    NotificationType["AccountPeerJoinedNotification"] = "ACCOUNT_PEER_JOINED";
    NotificationType["PeerJoinedNotification"] = "PEER_JOINED";
    NotificationType["PeerLeftNotification"] = "PEER_LEFT";
    NotificationType["MessageAddedNotification"] = "MESSAGE_ADDED";
    NotificationType["FilesAddedNotification"] = "FILES_ADDED";
    NotificationType["CommentAddedNotification"] = "COMMENT_ADDED";
    NotificationType["LikeAddedNotification"] = "LIKE_ADDED";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var ThreadType;
(function (ThreadType) {
    ThreadType["PRIVATE"] = "PRIVATE";
    ThreadType["READ_ONLY"] = "READ_ONLY";
    ThreadType["PUBLIC"] = "PUBLIC";
    ThreadType["OPEN"] = "OPEN";
    ThreadType["INVALID"] = "INVALID";
})(ThreadType = exports.ThreadType || (exports.ThreadType = {}));
var ThreadSharing;
(function (ThreadSharing) {
    ThreadSharing["NOT_SHARED"] = "NOT_SHARED";
    ThreadSharing["INVITE_ONLY"] = "INVITE_ONLY";
    ThreadSharing["SHARED"] = "SHARED";
    ThreadSharing["INVALID"] = "INVALID";
})(ThreadSharing = exports.ThreadSharing || (exports.ThreadSharing = {}));
var ThreadState;
(function (ThreadState) {
    ThreadState["LOADING"] = "LOADING";
    ThreadState["LOADED"] = "LOADED";
    ThreadState["INVALID"] = "INVALID";
})(ThreadState = exports.ThreadState || (exports.ThreadState = {}));
var UpdateType;
(function (UpdateType) {
    UpdateType[UpdateType["ThreadAdded"] = 0] = "ThreadAdded";
    UpdateType[UpdateType["ThreadRemoved"] = 1] = "ThreadRemoved";
    UpdateType[UpdateType["AccountPeerAdded"] = 2] = "AccountPeerAdded";
    UpdateType[UpdateType["AccountPeerRemoved"] = 3] = "AccountPeerRemoved";
})(UpdateType = exports.UpdateType || (exports.UpdateType = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["CRITICAL"] = "CRITICAL";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["NOTICE"] = "NOTICE";
    LogLevel["INFO"] = "INFO";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
