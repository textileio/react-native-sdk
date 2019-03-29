import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

/**
 * Add a new comment to a Thread by blockId.
 * ```typescript
 * API.comments.add(blockId, body);
 * ```
 */
export async function add(blockId: string, body: string): Promise<string> {
  const result = await TextileNode.addComment(blockId, body)
  return result as string
}
