import { NativeModules } from 'react-native'

const { FlagsBridge } = NativeModules

/**
 * Flacg a Block by BlockId
 * ```typescript
 * Textile.flags.add(blockId);
 * ```
 */
export async function add(blockId: string): Promise<string> {
  const result = await FlagsBridge.add(blockId)
  return result as string
}
