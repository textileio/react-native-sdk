import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import {
  ICafeSession,
  CafeSession,
  ICafeSessionList,
  CafeSessionList,
} from './model'

const { CafesBridge } = NativeModules

/**
 * Register a new remote cafe.
 * ```typescript
 * Textile.cafes.register(url, token);
 * ```
 */
export async function register(url: string, token: string): Promise<void> {
  return CafesBridge.register(url, token)
}

/**
 * Initialize a new session.
 * ```typescript
 * Textile.cafes.session(peerId);
 * ```
 */
export async function session(peerId: string): Promise<ICafeSession | undefined> {
  const result = await CafesBridge.session(peerId)
  if (!result) {
    return undefined
  }
  return CafeSession.decode(Buffer.from(result, 'base64'))
}

/**
 * List all sessions.
 * ```typescript
 * Textile.cafes.sessions();
 * ```
 */
export async function sessions(): Promise<ICafeSessionList | undefined> {
  const result = await CafesBridge.sessions()
  if (!result) {
    return undefined
  }
  return CafeSessionList.decode(Buffer.from(result, 'base64'))
}

/**
 * Refresh an existing session by peerId.
 * ```typescript
 * Textile.cafes.refreshSession(peerId);
 * ```
 */
export async function refreshSession(peerId: string): Promise<ICafeSession | undefined> {
  const result = await CafesBridge.refreshession(peerId)
  if (!result) {
    return undefined
  }
  return CafeSession.decode(Buffer.from(result, 'base64'))
}

/**
 * Deregister a remote Cafe.
 * ```typescript
 * Textile.cafes.deregister();
 * ```
 */
export async function deregister(id: string): Promise<void> {
  return CafesBridge.deregister(id)
}

/**
 * Check for offline messages on remote Cafe.
 * ```typescript
 * Textile.cafes.checkMessages();
 * ```
 */
export async function checkMessages(): Promise<void> {
  return CafesBridge.checkMessages()
}
