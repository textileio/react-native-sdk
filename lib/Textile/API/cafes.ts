import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Cafes {

  register = async (url: string, token: string): Promise<void> => {
    return await TextileNode.registerCafe(url, token)
  }

  session = async (peerId: string): Promise<pb.ICafeSession | undefined> => {
    const result = await TextileNode.cafeSession(peerId)
    if (!result) {
      return undefined
    }
    return pb.CafeSession.decode(Buffer.from(result, 'base64'))
  }

  sessions = async (): Promise<pb.ICafeSessionList | undefined> => {
    const result = await TextileNode.cafeSessions()
    if (!result) {
      return undefined
    }
    return pb.CafeSessionList.decode(Buffer.from(result, 'base64'))
  }

  refreshSession = async (peerId: string): Promise<pb.ICafeSession | undefined> => {
    const result = await TextileNode.refreshCafeSession(peerId)
    if (!result) {
      return undefined
    }
    return pb.CafeSession.decode(Buffer.from(result, 'base64'))
  }

  deregister = async (id: string): Promise<void> => {
    return await TextileNode.deregisterCafe(id)
  }

  checkMessages = async (): Promise<void> => {
    return await TextileNode.checkCafeMessages()
  }

}
