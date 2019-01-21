"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    ThreadType["READONLY"] = "READONLY";
    ThreadType["PUBLIC"] = "PUBLIC";
    ThreadType["OPEN"] = "OPEN";
    ThreadType["INVALID"] = "INVALID";
})(ThreadType = exports.ThreadType || (exports.ThreadType = {}));
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
