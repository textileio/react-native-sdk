export interface DiscoveredCafe {
  readonly peer: string
  readonly address: string
  readonly api: string
  readonly protocol: string
  readonly node: string
  readonly url: string
}

export interface DiscoveredCafes {
  readonly primary: DiscoveredCafe
  readonly secondary: DiscoveredCafe
}

export enum BlockType {
  MERGE = 'MERGE',
  IGNORE = 'IGNORE',
  FLAG = 'FLAG',
  JOIN = 'JOIN',
  ANNOUNCE = 'ANNOUNCE',
  LEAVE = 'LEAVE',
  MESSAGE = 'MESSAGE',
  FILES = 'FILES',
  COMMENT = 'COMMENT',
  LIKE = 'LIKE',
  INVALID = 'INVALID'
}

export interface BlockInfo {
  readonly id: string
  readonly thread_id: string
  readonly author_id: string
  readonly username: string
  readonly avatar?: string
  readonly type: BlockType
  readonly date: string
  readonly parents: ReadonlyArray<string>
  readonly target?: string
  readonly body?: string
}

export interface ExternalInvite {
  readonly id: string
  readonly key: string
  readonly inviter: string
}

export interface Cafe {
  readonly peer: string
  readonly address: string
  readonly api: string
  readonly protocol: string
  readonly node: string
  readonly url: string
  readonly swarm: ReadonlyArray<string>
}

export interface ContactInfo {
  readonly id: string
  readonly address: string
  readonly username?: string
  readonly avatar?: string
  readonly inboxes?: ReadonlyArray<Cafe>
  readonly created: string
  readonly updated: string
  readonly thread_ids?: ReadonlyArray<string>
}

export interface ContactInfoQueryResult {
  readonly local?: ReadonlyArray<ContactInfo>
  readonly remote?: ReadonlyArray<ContactInfo>
}

export enum NotificationType {
  InviteReceivedNotification = 'INVITE_RECEIVED',
  AccountPeerJoinedNotification = 'ACCOUNT_PEER_JOINED',
  PeerJoinedNotification = 'PEER_JOINED',
  PeerLeftNotification = 'PEER_LEFT',
  MessageAddedNotification = 'MESSAGE_ADDED',
  FilesAddedNotification = 'FILES_ADDED',
  CommentAddedNotification = 'COMMENT_ADDED',
  LikeAddedNotification = 'LIKE_ADDED'
}

export interface NotificationInfo {
  readonly id: string
  readonly date: string
  readonly actor_id: string
  readonly username?: string
  readonly avatar?: string
  readonly subject: string
  readonly subject_id: string
  readonly block_id?: string
  readonly target?: string
  readonly type: NotificationType
  readonly body: string
  readonly read: boolean
}

export interface Overview {
  readonly account_peer_cnt: number
  readonly thread_cnt: number
  readonly file_cnt: number
  readonly contact_cnt: number
}

export interface FileData {
  readonly url: string
}

export interface Link {
  readonly use?: string
  readonly pin: boolean
  readonly plaintext: boolean
  readonly mill?: string
  readonly opts?: { readonly [key: string]: string }
  readonly json_schema?: { readonly [key: string]: any }
}

export interface Node {
  readonly name?: string
  readonly pin: boolean
  readonly plaintext: boolean
  readonly mill?: string
  readonly opts?: { readonly [key: string]: string }
  readonly json_schema?: { readonly [key: string]: any }
  readonly links?: { readonly [key: string]: Link }
}

export enum ThreadType {
  PRIVATE = 'PRIVATE',
  READ_ONLY = 'READ_ONLY',
  PUBLIC = 'PUBLIC',
  OPEN = 'OPEN',
  INVALID = 'INVALID'
}

export enum ThreadSharing {
  NOT_SHARED = 'NOT_SHARED',
  INVITE_ONLY = 'INVITE_ONLY',
  SHARED = 'SHARED',
  INVALID = 'INVALID'
}

export enum ThreadState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  INVALID = 'INVALID'
}

export interface ThreadInfo {
  readonly id: string
  readonly key: string
  readonly name: string
  readonly schema?: Node
  readonly schema_id?: string
  readonly initiator: string
  readonly type: ThreadType
  readonly sharing: ThreadSharing
  readonly members?: ReadonlyArray<string>
  readonly state: ThreadState
  readonly head?: BlockInfo
  readonly peer_cnt: number
  readonly block_cnt: number
  readonly file_cnt: number
}

export interface WalletAccount {
  readonly seed: string
  readonly address: string
}

export interface ThreadUpdate {
  block: BlockInfo
  thread_id: string
  thread_key: string
  thread_name: string
  info?: any
}

export enum UpdateType {
  ThreadAdded,
  ThreadRemoved,
  AccountPeerAdded,
  AccountPeerRemoved
}

export interface Update {
  id: string
  key: string
  name: string
  type: UpdateType
}

export enum LogLevel {
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  NOTICE = 'NOTICE',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}
