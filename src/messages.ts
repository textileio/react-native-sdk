import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  TextList,
  ITextList,
} from './model'

const { MessagesBridge } = NativeModules

/**
 * Add a new message to a Thread.
 * ```typescript
 * Textile.messages.add(threadId, body);
 * ```
 */
export async function add(threadId: string, body: string): Promise<string> {
  const result = await MessagesBridge.add(threadId, body)
  return result as string
}

/**
 * List all messages or list all messages in a Thread.
 * ```typescript
 * Textile.messages.list(offset, limit);
 * ```
 */
export async function list(offset: string, limit: number, threadId?: string): Promise<ITextList> {
  const result = await MessagesBridge.list(offset, limit, threadId)
  return TextList.decode(Buffer.from(result, 'base64'))
}
