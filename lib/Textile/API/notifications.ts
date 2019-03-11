import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules


/**
 * List all Notifications.
 */
export async function list(offset: string, limit: number): Promise<pb.INotificationList> {
  const result = await TextileNode.notifications(offset, limit)
  return pb.NotificationList.decode(Buffer.from(result, 'base64'))
}

/**
 * Get count of unread Notifications.
 */
export async function countUnread(): Promise<number> {
  const result = await TextileNode.countUnreadNotifications()
  return result as number
}

/**
 * Mark a Notification as read by ID.
 */
export async function read(id_: string): Promise<void> {
  await TextileNode.readNotification(id_)
}

/**
 * Mark all Notifications as read.
 */
export async function readAll(): Promise<void> {
  await TextileNode.readAllNotifications()
}

/**
 * Accept an Invite included in a Notification.
 */
export async function acceptInvite(id_: string): Promise<string> {
  const result = await TextileNode.acceptInviteViaNotification(id_)
  return result as string
}

/**
 * Ignore an Invite included in a Notification.
 */
export async function ignoreInvite(id_: string): Promise<string> {
  const result = await TextileNode.ignoreInviteViaNotification(id_)
  return result as string
}
