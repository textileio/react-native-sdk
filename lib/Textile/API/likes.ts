import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

/**
 * Add a like to a shared block.
 * ```typescript
 * API.likes.add(blockId);
 * ```
 */
export async function add(blockId: string): Promise<string> {
  const result = await TextileNode.addLike(blockId)
  return result as string
}
