import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Register a new remote cafe.
 * ```typescript
 * API.cafes.register(url, token);
 * ```
 */
export async function register(url: string, token: string): Promise<void> {
  return await TextileNode.registerCafe(url, token)
}

/**
 * Initialize a new session.
 * ```typescript
 * API.cafe.session(peerId);
 * ```
 */
export async function session(peerId: string): Promise<pb.ICafeSession | undefined> {
  const result = await TextileNode.cafeSession(peerId)
  if (!result) {
    return undefined
  }
  return pb.CafeSession.decode(Buffer.from(result, 'base64'))
}
/**
 * List all sessions.
 * ```typescript
 * API.cafe.sessions();
 * ```
 */
export async function sessions(): Promise<pb.ICafeSessionList | undefined> {
  const result = await TextileNode.cafeSessions()
  if (!result) {
    return undefined
  }
  return pb.CafeSessionList.decode(Buffer.from(result, 'base64'))
}
/**
 * Refresh an existing session by peerId.
 * ```typescript
 * API.cafe.refreshSession(peerId);
 * ```
 */
export async function refreshSession(peerId: string): Promise<pb.ICafeSession | undefined> {
  const result = await TextileNode.refreshCafeSession(peerId)
  if (!result) {
    return undefined
  }
  return pb.CafeSession.decode(Buffer.from(result, 'base64'))
}
/**
 * Deregister a remote Cafe.
 * ```typescript
 * API.cafe.deregister();
 * ```
 */
export async function deregister(id: string): Promise<void> {
  return await TextileNode.deregisterCafe(id)
}
/**
 * Check for offline messages on remote Cafe.
 * ```typescript
 * API.cafe.checkMessages();
 * ```
 */
export async function checkMessages(): Promise<void> {
  return await TextileNode.checkCafeMessages()
}
