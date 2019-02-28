import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Notifications {

  list = async (offset: string, limit: number): Promise<pb.INotificationList> => {
    const result = await TextileNode.notifications(offset, limit)
    return pb.NotificationList.decode(Buffer.from(result, 'base64'))
  }

  countUnread = async (): Promise<number> => {
    const result = await TextileNode.countUnreadNotifications()
    return result as number
  }

  read = async (id_: string): Promise<void> => {
    await TextileNode.readNotification(id_)
  }

  readAll = async (): Promise<void> => {
    await TextileNode.readAllNotifications()
  }

  acceptInvite = async (id_: string): Promise<string> => {
    const result = await TextileNode.acceptInviteViaNotification(id_) // returns addr
    return result as string
  }

  ignoreInvite = async (id_: string): Promise<string> => {
    const result = await TextileNode.ignoreInviteViaNotification(id_)
    return result as string
  }

}
