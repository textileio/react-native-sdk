import { NativeModules } from 'react-native'

const { IgnoresBridge } = NativeModules

/**
 * Ignore a Thread share.
 * ```typescript
 * Textile.ignores.add(blockId);
 * ```
 */
export async function add(blockId: string): Promise<string> {
  const result = await IgnoresBridge.add(blockId)
  return result as string
}
