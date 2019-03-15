import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules
/**
 * Flack a Block by BlockId
 * ```typescript
 * API.flags.add(blockId);
 * ```
 */
export async function add(blockId: string): Promise<string> {
  const result = await TextileNode.addFlag(blockId)
  return result as string
}
