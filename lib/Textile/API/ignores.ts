import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules
/**
 * Ignore a Thread share.
 */
export async function add(blockId: string): Promise<string> {
  const result = await TextileNode.addIgnore(blockId)
  return result as string
}
