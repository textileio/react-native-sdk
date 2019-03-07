import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function address(): Promise<string> {
  const result = await TextileNode.address()
  return result as string
}

export async function seed(): Promise<string> {
  const result = await TextileNode.seed()
  return result as string
}

export async function encrypt(input: Buffer): Promise<Buffer> {
  const result = await TextileNode.encrypt(input.toString('base64'))
  return Buffer.from(result, 'base64')
}

export async function decrypt(input: Buffer): Promise<Buffer> {
  const result = await TextileNode.decrypt(input.toString('base64'))
  return Buffer.from(result, 'base64')
}

export async function peers(): Promise<pb.IContactList> {
  const result = await TextileNode.accountPeers()
  return pb.ContactList.decode(Buffer.from(result, 'base64'))
}

export async function findThreadBackups(query: pb.IThreadBackupQuery, options: pb.IQueryOptions): Promise<string> {
  return TextileNode.findThreadBackups(
    Buffer.from(pb.ThreadBackupQuery.encode(query).finish()).toString('base64'),
    Buffer.from(pb.QueryOptions.encode(options).finish()).toString('base64')
  )
}

export async function cancelFindThreadBackups(): Promise<void> {
  return await TextileNode.cancelFindThreadBackups()
}
