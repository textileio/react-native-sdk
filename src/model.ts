import {
  IText,
  IComment,
  ILike,
  IFiles,
  IIgnore,
  IJoin,
  ILeave
} from '@textile/js-types'

export * from '@textile/js-types'

export class EventSubscription {
  cancel: () => void
  constructor(cancel: () => void) {
    this.cancel = cancel
  }
}

export enum FeedItemType {
  Text,
  Comment,
  Like,
  Files,
  Ignore,
  Join,
  Leave
}

export interface TextFeedItem {
  type: FeedItemType.Text
  block: string
  value: IText
}

export interface CommentFeedItem {
  type: FeedItemType.Comment
  block: string
  value: IComment
}

export interface LikeFeedItem {
  type: FeedItemType.Like
  block: string
  value: ILike
}

export interface FilesFeedItem {
  type: FeedItemType.Files
  block: string
  value: IFiles
}

export interface IgnoreFeedItem {
  type: FeedItemType.Ignore
  block: string
  value: IIgnore
}

export interface JoinFeedItem {
  type: FeedItemType.Join
  block: string
  value: IJoin
}

export interface LeaveFeedItem {
  type: FeedItemType.Leave
  block: string
  value: ILeave
}

export type FeedItemData = TextFeedItem | CommentFeedItem | LikeFeedItem | FilesFeedItem | IgnoreFeedItem | JoinFeedItem | LeaveFeedItem
