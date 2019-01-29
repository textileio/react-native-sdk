import { File, ExternalInvite, ContactInfo, ContactInfoQueryResult, Overview, FileData, ThreadInfo, WalletAccount, BlockInfo, NotificationInfo, ThreadFilesInfo, ThreadFeedItem, ThreadMessageInfo, LogLevel } from './Models';
import { IMobilePreparedFiles, ICafeSession, ICafeSessions, IDirectory } from '@textile/react-native-protobufs';
/**
 * Returns the hash of the initial join block. Not the threadId of the final thread created/joined
 */
export declare function acceptExternalThreadInvite(id_: string, key: string): Promise<string>;
export declare function acceptThreadInviteViaNotification(id_: string): Promise<string>;
export declare function addContact(contact: ContactInfo): Promise<void>;
export declare function addExternalThreadInvite(threadId: string): Promise<ExternalInvite>;
export declare function addSchema(jsonstr: string): Promise<File>;
export declare function addThread(key: string, name: string, shared: boolean): Promise<ThreadInfo>;
export declare function addThreadComment(blockId: string, body: string): Promise<string>;
export declare function addThreadFiles(dir: IDirectory, threadId: string, caption?: string): Promise<BlockInfo>;
export declare function addThreadFilesByTarget(target: string, threadId: string, caption?: string): Promise<BlockInfo>;
export declare function addThreadIgnore(blockId: string): Promise<string>;
export declare function addThreadInvite(threadId: string, inviteeId: string): Promise<string>;
export declare function addThreadLike(blockId: string): Promise<string>;
export declare function addThreadMessage(threadId: string, body: string): Promise<string>;
export declare function address(): Promise<string>;
export declare function avatar(): Promise<string | undefined>;
export declare function cafeSession(peerId: string): Promise<ICafeSession | undefined>;
export declare function cafeSessions(): Promise<ICafeSessions | undefined>;
export declare function checkCafeMessages(): Promise<void>;
export declare function contact(id_: string): Promise<ContactInfo>;
export declare function contactThreads(id_: string): Promise<ReadonlyArray<ThreadInfo>>;
export declare function contacts(): Promise<ReadonlyArray<ContactInfo>>;
export declare function countUnreadNotifications(): Promise<number>;
export declare function deregisterCafe(peerId: string): Promise<void>;
export declare function fileData(hash: string): Promise<FileData>;
export declare function findContact(username: string, limit: number, wait: number): Promise<ContactInfoQueryResult>;
export declare function ignoreThreadInviteViaNotification(id_: string): Promise<string>;
export declare function imageFileDataForMinWidth(pth: string, minWidth: number): Promise<FileData>;
export declare function notifications(offset: string, limit: number): Promise<ReadonlyArray<NotificationInfo>>;
export declare function overview(): Promise<Overview>;
export declare function peerId(): Promise<string>;
export declare function prepareFiles(path: string, threadId: string): Promise<IMobilePreparedFiles>;
export declare function prepareFilesAsync(path: string, threadId: string): Promise<IMobilePreparedFiles>;
export declare function profile(): Promise<ContactInfo>;
export declare function readAllNotifications(): Promise<void>;
export declare function readNotification(id_: string): Promise<void>;
export declare function refreshCafeSession(peerId: string): Promise<ICafeSession | undefined>;
export declare function registerCafe(peerId: string): Promise<void>;
export declare function removeThread(id_: string): Promise<string>;
export declare function seed(): Promise<string>;
export declare function setAvatar(id_: string): Promise<void>;
export declare function setLogLevels(levels: Map<string, LogLevel>): Promise<void>;
export declare function setUsername(username: string): Promise<void>;
export declare function start(): Promise<void>;
export declare function stop(): Promise<void>;
export declare function threadFeed(offset: string, limit: number, threadId?: string): Promise<ReadonlyArray<ThreadFeedItem>>;
export declare function threadFiles(offset: string, limit: number, threadId?: string): Promise<ReadonlyArray<ThreadFilesInfo>>;
export declare function threadMessages(offset: string, limit: number, threadId?: string): Promise<ReadonlyArray<ThreadMessageInfo>>;
export declare function threadInfo(threadId: string): Promise<ThreadInfo>;
export declare function threads(): Promise<ReadonlyArray<ThreadInfo>>;
export declare function username(): Promise<string | undefined>;
export declare function version(): Promise<string>;
export declare function initRepo(seed: string, repoPath: string, logToDisk: boolean, debug: boolean): Promise<void>;
export declare function migrateRepo(repoPath: string): Promise<void>;
export declare function newTextile(repoPath: string, debug: boolean): Promise<void>;
export declare function newWallet(wordCount: number): Promise<string>;
export declare function walletAccountAt(phrase: string, index: number, password?: string): Promise<WalletAccount>;
