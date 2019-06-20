import { Buffer } from 'buffer'
import {
  Text,
  Comment,
  Like,
  Files,
  Ignore,
  Join,
  Leave,
  FeedItemType,
  FeedItemData,
} from './model'

export function toFeedItemData(type: FeedItemType, block: string, data: string): FeedItemData {
  switch (type) {
    case FeedItemType.Text:
      return {
        type,
        block,
        value: Text.decode(Buffer.from(data, 'base64')),
      }
    case FeedItemType.Comment:
      return {
        type,
        block,
        value: Comment.decode(Buffer.from(data, 'base64')),
      }
    case FeedItemType.Like:
      return {
        type,
        block,
        value: Like.decode(Buffer.from(data, 'base64')),
      }
    case FeedItemType.Files:
      return {
        type,
        block,
        value: Files.decode(Buffer.from(data, 'base64')),
      }
    case FeedItemType.Ignore:
      return {
        type,
        block,
        value: Ignore.decode(Buffer.from(data, 'base64')),
      }
    case FeedItemType.Join:
      return {
        type,
        block,
        value: Join.decode(Buffer.from(data, 'base64')),
      }
    case FeedItemType.Leave:
      return {
        type,
        block,
        value: Leave.decode(Buffer.from(data, 'base64')),
      }
  }
}
