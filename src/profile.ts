import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  Peer,
  IPeer,
  IDirectory,
  Directory,
  Block,
  IBlock,
  Thread,
  IThread,
} from './model'

const { ProfileBridge } = NativeModules

/**
 * Get the profile.
 * ```typescript
 * Textile.profile.get();
 * ```
 */
export async function get(): Promise<IPeer> {
  const result = await ProfileBridge.get()
  return Peer.decode(Buffer.from(result, 'base64'))
}

/**
 * Get the name.
 * ```typescript
 * Textile.profile.name();
 * ```
 */
export async function name(): Promise<string | undefined> {
  const result: string = await ProfileBridge.name()
  return result.length > 0 ? result : undefined
}

/**
 * Update the name.
 * ```typescript
 * Textile.profile.setName(name);
 * ```
 */
export async function setName(name: string): Promise<void> {
  await ProfileBridge.setName(name)
}

/**
 * Get the BlockId of the current user Avatar.
 * ```typescript
 * Textile.profile.avatar();
 * ```
 */
export async function avatar(): Promise<string | undefined> {
  const result: string = await ProfileBridge.avatar()
  return result.length > 0 ? result : undefined
}

/**
 * Get the account thread.
 */
export async function accountThread(): Promise<IThread> {
  const result = await ProfileBridge.accountThread()
  return Thread.decode(Buffer.from(result, 'base64'))
}
