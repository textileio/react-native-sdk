import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Get the profile.
 */
export async function get(): Promise<pb.IContact> {
  const result = await TextileNode.profile()
  return pb.Contact.decode(Buffer.from(result, 'base64'))
}

/**
 * Get the username.
 */
export async function username(): Promise<string | undefined> {
  const result: string = await TextileNode.username()
  return result.length > 0 ? result : undefined
}

/**
 * Update the username.
 */
export async function setUsername(username: string): Promise<void> {
  await TextileNode.setUsername(username)
}

/**
 * Get the BlockId of the current user Avatar.
 */
export async function avatar(): Promise<string | undefined> {
  const result: string = await TextileNode.avatar()
  return result.length > 0 ? result : undefined
}

/**
 * Set a new Avatar by ID.
 */
export async function setAvatar(id_: string): Promise<void> {
  await TextileNode.setAvatar(id_)
}
