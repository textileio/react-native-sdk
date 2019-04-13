import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  NotificationList,
} from './model-internal'
import {
  INotificationList,
} from './model-public'

const { NotificationsBridge } = NativeModules

/**
 * List all Notifications.
 * ```typescript
 * Textile.notifications.list(offset, limit);
 * ```
 */
export async function list(offset: string, limit: number): Promise<INotificationList> {
  const result = await NotificationsBridge.list(offset, limit)
  return NotificationList.decode(Buffer.from(result, 'base64'))
}

/**
 * Get count of unread Notifications.
 * ```typescript
 * Textile.notifications.countUnread();
 * ```
 */
export async function countUnread(): Promise<number> {
  const result = await NotificationsBridge.countUnread()
  return result as number
}

/**
 * Mark a Notification as read by ID.
 * ```typescript
 * Textile.notifications.read(id);
 * ```
 */
export async function read(id_: string): Promise<void> {
  await NotificationsBridge.read(id_)
}

/**
 * Mark all Notifications as read.
 * ```typescript
 * Textile.notifications.readAll();
 * ```
 */
export async function readAll(): Promise<void> {
  await NotificationsBridge.readAll()
}

/**
 * Accept an Invite included in a Notification.
 * ```typescript
 * Textile.notifications.acceptInvite(id);
 * ```
 */
export async function acceptInvite(id_: string): Promise<string> {
  const result = await NotificationsBridge.acceptInvite(id_)
  return result as string
}

/**
 * Ignore an Invite included in a Notification.
 * ```typescript
 * Textile.notifications.ignoreInvite(id);
 * ```
 */
export async function ignoreInvite(id_: string): Promise<string> {
  const result = await NotificationsBridge.ignoreInvite(id_)
  return result as string
}
