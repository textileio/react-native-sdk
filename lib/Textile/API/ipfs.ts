import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

/**
 * Get node's IPFS peerId.
 */
export async function peerId(): Promise<string> {
  const result = await TextileNode.peerId()
  return result as string
}
