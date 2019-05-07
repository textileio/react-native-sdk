import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  Peer,
  IPeer,
  IDirectory,
  Directory,
  Block,
  IBlock,
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
 * Set a new Avatar by Directory.
 * ```typescript
 * Textile.profile.setAvatar(directory);
 * ```
 */
export async function setAvatar(directory: IDirectory): Promise<IBlock> {
  const payload = Directory.encode(directory).finish()
  const result = await ProfileBridge.setAvatar(Buffer.from(payload).toString('base64'))
  return Block.decode(Buffer.from(result, 'base64'))
}

/**
 * Set a new Avatar by target id.
 * ```typescript
 * Textile.profile.setAvatarByTarget(target);
 * ```
 */
export async function setAvatarByTarget(target: string): Promise<IBlock> {
  const result = await ProfileBridge.setAvatarByTarget(target)
  return Block.decode(Buffer.from(result, 'base64'))
}
