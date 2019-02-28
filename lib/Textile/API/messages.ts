import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Messages {

  add = async (threadId: string, body: string): Promise<string> => {
    const result = await TextileNode.addMessage(threadId, body) // returns hash
    return result as string
  }

  list = async (offset: string, limit: number, threadId?: string): Promise<pb.ITextList> => {
    const result = await TextileNode.messages(offset, limit, threadId)
    return pb.TextList.decode(Buffer.from(result, 'base64'))
  }

}
