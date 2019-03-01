import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export async function add(blockId: string, body: string): Promise<string> {
  const result = await TextileNode.addComment(blockId, body)
  return result as string
}
