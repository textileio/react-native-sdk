import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Invites {

  add = async (threadId: string, inviteeId: string): Promise<string> => {
    const result = await TextileNode.addInvite(threadId, inviteeId) // returns hash
    return result as string
  }

  remove = async (id_: string): Promise<string> => {
    const result = await TextileNode.removeThread(id_)
    return result as string
  }

  addExternal = async (threadId: string): Promise<pb.INewInvite> => {
    const result = await TextileNode.addExternalInvite(threadId)
    return pb.NewInvite.decode(Buffer.from(result, 'base64'))
  }

  acceptExternal = async (id_: string, key: string): Promise<string> => {
    const result = await TextileNode.acceptExternalInvite(id_, key) // returns hash
    return result as string
  }

}
