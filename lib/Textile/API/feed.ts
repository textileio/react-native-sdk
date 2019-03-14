import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules
/**
 * List all feed updates.
 * ```typescript
 * API.feed.list();
 * ```
 */
export async function list(request: pb.IFeedRequest): Promise<pb.IFeedItemList> {
  const payload = pb.FeedRequest.encode(request).finish()
  const result = await TextileNode.feed(Buffer.from(payload).toString('base64'))
  return pb.FeedItemList.decode(Buffer.from(result, 'base64'))
}
