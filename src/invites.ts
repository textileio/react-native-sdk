import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  ExternalInvite,
  IExternalInvite,
  InviteViewList,
  IInviteViewList,
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
 * List all pending thread invites.
 * ```typescript
 * Textile.invites.list();
 * ```
 */
export async function list(): Promise<IInviteViewList> {
  const result = await InvitesBridge.list()
  return InviteViewList.decode(Buffer.from(result, 'base64'))
}

/**
 * Accept invite by thread id.
 * ```typescript
 * Textile.invites.accept(threadId);
 * ```
 */
export async function accept(inviteId: string): Promise<string> {
  const result = await InvitesBridge.accept(inviteId)
  return result as string
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

/**
 * Ignore invite by thread id.
 * ```typescript
 * Textile.invites.ignore(threadId);
 * ```
 */
export async function ignore(inviteId: string): Promise<void> {
  return InvitesBridge.ignore(inviteId)
}
