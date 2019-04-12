import { NativeModules } from 'react-native'

const { CommentsBridge } = NativeModules

/**
 * Add a new comment to a Thread by blockId.
 * ```typescript
 * Textile.comments.add(blockId, body);
 * ```
 */
export async function add(blockId: string, body: string): Promise<string> {
  const result = await CommentsBridge.add(blockId, body)
  return result as string
}
