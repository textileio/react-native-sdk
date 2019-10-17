import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  CafeSession,
  ICafeSession,
  CafeSessionList,
  ICafeSessionList
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
export async function session(
  peerId: string
): Promise<ICafeSession | undefined> {
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
export async function sessions(): Promise<ICafeSessionList> {
  const result = await CafesBridge.sessions()
  return CafeSessionList.decode(Buffer.from(result, 'base64'))
}

/**
 * Refresh an existing session by peerId.
 * ```typescript
 * Textile.cafes.refreshSession(sessionId);
 * ```
 */
export async function refreshSession(
  sessionId: string
): Promise<ICafeSession | undefined> {
  const result = await CafesBridge.refreshSession(sessionId)
  if (!result) {
    return undefined
  }
  return CafeSession.decode(Buffer.from(result, 'base64'))
}

/**
 * Deregister a remote Cafe.
 * ```typescript
 * Textile.cafes.deregister(sessionId);
 * ```
 */
export async function deregister(sessionId: string): Promise<void> {
  return CafesBridge.deregister(sessionId)
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
