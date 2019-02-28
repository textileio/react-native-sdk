import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Profile {

  get = async (): Promise<pb.IContact> => {
    const result = await TextileNode.profile()
    return pb.Contact.decode(Buffer.from(result, 'base64'))
  }

  username = async (): Promise<string | undefined> => {
    const result: string = await TextileNode.username()
    return result.length > 0 ? result : undefined
  }

  setUsername = async (username: string): Promise<void> => {
    await TextileNode.setUsername(username)
  }

  avatar = async (): Promise<string | undefined> => {
    const result: string = await TextileNode.avatar()
    return result.length > 0 ? result : undefined
  }

  setAvatar = async (id_: string): Promise<void> => {
    await TextileNode.setAvatar(id_)
  }

}
