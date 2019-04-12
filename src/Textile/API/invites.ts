import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  IExternalInvite,
  ExternalInvite,
} from './model'

const { InvitesBridge } = NativeModules

/**
 * Add a new Thread invite by invitee address.
 * ```typescript
 * Textile.invites.add(threadId, address);
 * ```
 */
export async function add(threadId: string, address: string): Promise<void> {
  return InvitesBridge.add(threadId, address)
}

/**
 * Add an external Thread invite, returning a sharable object.
 * ```typescript
 * Textile.invites.addExternal(threadId);
 * ```
 */
export async function addExternal(threadId: string): Promise<IExternalInvite> {
  const result = await InvitesBridge.addExternal(threadId)
  return ExternalInvite.decode(Buffer.from(result, 'base64'))
}

/**
 * Accept an external invite.
 * ```typescript
 * Textile.invites.acceptExternal(id, key);
 * ```
 */
export async function acceptExternal(id_: string, key: string): Promise<string> {
  const result = await InvitesBridge.acceptExternal(id_, key)
  return result as string
}
