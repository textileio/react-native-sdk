import { NativeModules } from 'react-native'

const { IpfsBridge } = NativeModules

/**
 * Get node's IPFS peerId.
 * ```typescript
 * Textile.ipfs.peerId();
 * ```
 */
export async function peerId(): Promise<string> {
  const result = await IpfsBridge.peerId()
  return result as string
}

/**
 * Get raw file data by IPFS path. See `cat` method in IPFS.
 * ```typescript
 * Textile.ipfs.dataAtPath(path);
 * ```
 */
export async function dataAtPath(path: string): Promise<string> {
  const result = await IpfsBridge.dataAtPath(path)
  return result as string
}
