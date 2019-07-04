import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { FeedRequest, IFeedRequest, FeedItemType, FeedItemData } from './model'
import { toFeedItemData } from './util-internal'

const { FeedBridge } = NativeModules

/**
 * List all feed updates.
 * ```typescript
 * Textile.feed.list();
 * ```
 */
export async function list(request: IFeedRequest): Promise<FeedItemData[]> {
  const payload = FeedRequest.encode(request).finish()
  const result: ReadonlyArray<{
    type: FeedItemType
    block: string
    data: string
  }> = await FeedBridge.list(Buffer.from(payload).toString('base64'))
  const feedItemData = result.map(({ type, block, data }) =>
    toFeedItemData(type, block, data)
  )
  return feedItemData
}
