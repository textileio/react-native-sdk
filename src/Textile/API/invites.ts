import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules
/**
 * Add a new Thread invite for an invitee.
 * ```typescript
 * API.invites.add(threadId, inviteeId);
 * ```
 */
export async function add(threadId: string, inviteeId: string): Promise<string> {
  const result = await TextileNode.addInvite(threadId, inviteeId)
  return result as string
}

/**
 * Add an external Thread invite, returning an HTTPS link.
 * ```typescript
 * API.invites.addExternal(threadId);
 * ```
 */
export async function addExternal(threadId: string): Promise<pb.INewInvite> {
  const result = await TextileNode.addExternalInvite(threadId)
  return pb.NewInvite.decode(Buffer.from(result, 'base64'))
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
