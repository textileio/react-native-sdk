import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Contacts {

  add = async (contact: pb.IContact): Promise<void> => {
    const payload = pb.Contact.encode(contact).finish()
    await TextileNode.addContact(Buffer.from(payload).toString('base64'))
  }

  get = async (id_: string): Promise<pb.IContact | undefined> => {
    const result = await TextileNode.contact(id_)
    if (!result) {
      return undefined
    }
    return pb.Contact.decode(Buffer.from(result, 'base64'))
  }

  list = async (): Promise<pb.IContactList> => {
    const result = await TextileNode.contacts()
    return pb.ContactList.decode(Buffer.from(result, 'base64'))
  }

  remove = async (id_: string): Promise<void> => {
    return await TextileNode.removeContact(id_)
  }

  threads = async (id_: string): Promise<pb.IThreadList> => {
    const result = await TextileNode.contactThreads(id_)
    return pb.ThreadList.decode(Buffer.from(result, 'base64'))
  }

  search = async (query: pb.IContactQuery, options: pb.IQueryOptions): Promise<string> => {
    return TextileNode.searchContacts(
      Buffer.from(pb.ContactQuery.encode(query).finish()).toString('base64'),
      Buffer.from(pb.QueryOptions.encode(options).finish()).toString('base64')
    )
  }

  cancelSearch = async (): Promise<void> => {
    return await TextileNode.cancelSearchContacts()
  }

}
