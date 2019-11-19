import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

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
 * Open a new direct connection to a peer using an IPFS multiaddr
 * ```typescript
 * Textile.ipfs.connect(multiaddr);
 * ```
 */
export async function connect(multiaddr: string): Promise<boolean> {
  const result = await IpfsBridge.connect(multiaddr)
  return result
}

/**
 * Get raw file data by IPFS path. See `cat` method in IPFS.
 * ```typescript
 * Textile.ipfs.dataAtPath(path);
 * ```
 */
export async function dataAtPath(
  path: string
): Promise<{ data: Uint8Array; mediaType: string }> {
  const { data, mediaType } = await IpfsBridge.dataAtPath(path)
  return { data: Buffer.from(data, 'base64'), mediaType }
}

/**
 * Publishes a message to a given pubsub topic
 * ```typescript
 * Textile.ipfs.pubsubPub(topic, data);
 * ```
 */
export async function pubsubPub(
  topic: string,
  data: string | object
): Promise<string> {
  return await IpfsBridge.pubsubPub(
    topic,
    typeof data === 'string' ? data : JSON.stringify(data)
  )
}

/**
 * Subscribes to messages on a given topic
 * ```typescript
 * Textile.ipfs.pubsubSub(topic);
 * ```
 */
export async function pubsubSub(
  topic: string
): Promise<{ queryId: string; queryHandle: { close: () => void } }> {
  const queryId = await IpfsBridge.pubsubSub(topic)
  return {
    queryId,
    queryHandle: {
      close: () => {
        IpfsBridge.cancelPubsubSub(queryId)
      }
    }
  }
}
