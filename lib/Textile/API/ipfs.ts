import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

/**
 * Get raw file data by IPFS path. See `cat` method in IPFS.
 */
export async function dataAtPath(path: string): Promise<string> {
  const result = await TextileNode.dataAtPath(path)
  return result as string
}

/**
 * Get node's IPFS peerId.
 */
export async function peerId(): Promise<string> {
  const result = await TextileNode.peerId()
  return result as string
}
