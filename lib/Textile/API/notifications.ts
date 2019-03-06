import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function list(offset: string, limit: number): Promise<pb.INotificationList> {
  const result = await TextileNode.notifications(offset, limit)
  return pb.NotificationList.decode(Buffer.from(result, 'base64'))
}

export async function countUnread(): Promise<number> {
  const result = await TextileNode.countUnreadNotifications()
  return result as number
}

export async function read(id_: string): Promise<void> {
  await TextileNode.readNotification(id_)
}

export async function readAll(): Promise<void> {
  await TextileNode.readAllNotifications()
}

export async function acceptInvite(id_: string): Promise<string> {
  const result = await TextileNode.acceptInviteViaNotification(id_)
  return result as string
}

export async function ignoreInvite(id_: string): Promise<string> {
  const result = await TextileNode.ignoreInviteViaNotification(id_)
  return result as string
}
