import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function get(): Promise<pb.IContact> {
  const result = await TextileNode.profile()
  return pb.Contact.decode(Buffer.from(result, 'base64'))
}

export async function username(): Promise<string | undefined> {
  const result: string = await TextileNode.username()
  return result.length > 0 ? result : undefined
}

export async function setUsername(username: string): Promise<void> {
  await TextileNode.setUsername(username)
}

export async function avatar(): Promise<string | undefined> {
  const result: string = await TextileNode.avatar()
  return result.length > 0 ? result : undefined
}

export async function setAvatar(id_: string): Promise<void> {
  await TextileNode.setAvatar(id_)
}
