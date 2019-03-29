import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Get the profile.
 * ```typescript
 * API.profile.get();
 * ```
 */
export async function get(): Promise<pb.IContact> {
  const result = await TextileNode.profile()
  return pb.Contact.decode(Buffer.from(result, 'base64'))
}

/**
 * Get the name.
 * ```typescript
 * API.profile.name();
 * ```
 */
export async function name(): Promise<string | undefined> {
  const result: string = await TextileNode.name()
  return result.length > 0 ? result : undefined
}

/**
 * Update the name.
 * ```typescript
 * API.profile.setName(name);
 * ```
 */
export async function setName(name: string): Promise<void> {
  await TextileNode.setName(name)
}

/**
 * Get the BlockId of the current user Avatar.
 * ```typescript
 * API.profile.avatar();
 * ```
 */
export async function avatar(): Promise<string | undefined> {
  const result: string = await TextileNode.avatar()
  return result.length > 0 ? result : undefined
}

/**
 * Set a new Avatar by ID.
 * ```typescript
 * API.profile.setAvatar(id);
 * ```
 */
export async function setAvatar(id_: string): Promise<void> {
  await TextileNode.setAvatar(id_)
}
