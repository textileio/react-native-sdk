import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function add(threadId: string, body: string): Promise<string> {
  const result = await TextileNode.addMessage(threadId, body)
  return result as string
}

export async function list(offset: string, limit: number, threadId?: string): Promise<pb.ITextList> {
  const result = await TextileNode.messages(offset, limit, threadId)
  return pb.TextList.decode(Buffer.from(result, 'base64'))
}
