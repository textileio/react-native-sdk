import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Add a new message to a Thread.
 */
export async function add(threadId: string, body: string): Promise<string> {
  const result = await TextileNode.addMessage(threadId, body)
  return result as string
}

/**
 * List all messages or list all messages in a Thread.
 */
export async function list(offset: string, limit: number, threadId?: string): Promise<pb.ITextList> {
  const result = await TextileNode.messages(offset, limit, threadId)
  return pb.TextList.decode(Buffer.from(result, 'base64'))
}
