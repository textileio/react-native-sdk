import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Add a new Thread invite by invitee address.
 * ```typescript
 * API.invites.add(threadId, address);
 * ```
 */
export async function add(threadId: string, address: string): Promise<string> {
  const result = await TextileNode.addInvite(threadId, address)
  return result as string
}

/**
 * Add an external Thread invite, returning a sharable object.
 * ```typescript
 * API.invites.addExternal(threadId);
 * ```
 */
export async function addExternal(threadId: string): Promise<pb.IExternalInvite> {
  const result = await TextileNode.addExternalInvite(threadId)
  return pb.ExternalInvite.decode(Buffer.from(result, 'base64'))
}

/**
 * Accept an external invite.
 * ```typescript
 * API.invites.acceptExternal(id, key);
 * ```
 */
export async function acceptExternal(id_: string, key: string): Promise<string> {
  const result = await TextileNode.acceptExternalInvite(id_, key)
  return result as string
}
