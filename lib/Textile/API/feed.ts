import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Feed {

  list = async (request: pb.IFeedRequest): Promise<pb.IFeedItemList> => {
    const payload = pb.FeedRequest.encode(request).finish()
    const result = await TextileNode.feed(Buffer.from(payload).toString('base64'))
    return pb.FeedItemList.decode(Buffer.from(result, 'base64'))
  }

}
