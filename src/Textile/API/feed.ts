import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import {
  IFeedRequest,
  FeedRequest,
  IFeedItemList,
  FeedItemList,
} from './model'

const { FeedBridge } = NativeModules

/**
 * List all feed updates.
 * ```typescript
 * Textile.feed.list();
 * ```
 */
export async function list(request: IFeedRequest): Promise<IFeedItemList> {
  const payload = FeedRequest.encode(request).finish()
  const result = await FeedBridge.list(Buffer.from(payload).toString('base64'))
  return FeedItemList.decode(Buffer.from(result, 'base64'))
}
