import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export async function peerId(): Promise<string> {
  const result = await TextileNode.peerId()
  return result as string
}
