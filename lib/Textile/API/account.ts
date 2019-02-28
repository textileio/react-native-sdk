import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Account {

  address = async (): Promise<string> => {
    const result = await TextileNode.address()
    return result as string
  }

  seed = async (): Promise<string> => {
    const result = await TextileNode.seed()
    return result as string
  }

  encrypt = async (input: Buffer): Promise<Buffer> => {
    const result = await TextileNode.encrypt(input.toString('base64'))
    return Buffer.from(result, 'base64')
  }

  decrypt = async (input: Buffer): Promise<Buffer> => {
    const result = await TextileNode.encrypt(input.toString('base64'))
    return Buffer.from(result, 'base64')
  }

  peers = async (): Promise<pb.IContactList> => {
    const result = await TextileNode.accountPeers()
    return pb.ContactList.decode(Buffer.from(result, 'base64'))
  }

  findThreadBackups = async (query: pb.IThreadBackupQuery, options: pb.IQueryOptions): Promise<string> => {
    return TextileNode.findThreadBackups(
      Buffer.from(pb.ThreadBackupQuery.encode(query).finish()).toString('base64'),
      Buffer.from(pb.QueryOptions.encode(options).finish()).toString('base64')
    )
  }

  cancelFindThreadBackups = async (): Promise<void> => {
    return await TextileNode.cancelFindThreadBackups()
  }

}
