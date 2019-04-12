import { NativeModules } from 'react-native'

const { LikesBridge } = NativeModules

/**
 * Add a like to a shared block.
 * ```typescript
 * Textile.likes.add(blockId);
 * ```
 */
export async function add(blockId: string): Promise<string> {
  const result = await LikesBridge.add(blockId)
  return result as string
}
