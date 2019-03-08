import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export async function dataAtPath(path: string): Promise<string> {
  const result = await TextileNode.dataAtPath(path)
  return result as string
}

export async function peerId(): Promise<string> {
  const result = await TextileNode.peerId()
  return result as string
}
