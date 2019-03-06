import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export async function add(blockId: string): Promise<string> {
  const result = await TextileNode.addLike(blockId)
  return result as string
}
