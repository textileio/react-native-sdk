import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules
/**
 * Flack a Block by BlockId
 */
export async function add(blockId: string): Promise<string> {
  const result = await TextileNode.addFlag(blockId)
  return result as string
}
