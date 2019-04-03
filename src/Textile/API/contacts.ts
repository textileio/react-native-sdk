import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Add a new Contact after fetching the Contact information.
 */
export async function add(contact: pb.IContact): Promise<void> {
  const payload = pb.Contact.encode(contact).finish()
  await TextileNode.addContact(Buffer.from(payload).toString('base64'))
}

/**
 * Get Contact information by address.
 */
export async function get(address: string): Promise<pb.IContact | undefined> {
  const result = await TextileNode.contact(address)
  if (!result) {
    return undefined
  }
  return pb.Contact.decode(Buffer.from(result, 'base64'))
}

/**
 * List all known Contacts.
 */
export async function list(): Promise<pb.IContactList> {
  const result = await TextileNode.contacts()
  return pb.ContactList.decode(Buffer.from(result, 'base64'))
}

/**
 * Remove a Contact by their address.
 */
export async function remove(address: string): Promise<void> {
  return TextileNode.removeContact(address)
}

/**
 * List all Threads in common with a Contact.
 * ```typescript
 * API.contacts.threads(address);
 * ```
 */
export async function threads(address: string): Promise<pb.IThreadList> {
  const result = await TextileNode.contactThreads(address)
  return pb.ThreadList.decode(Buffer.from(result, 'base64'))
}

/**
 * Search for Contacts over network.
 * ```typescript
 * API.contacts.search(query, options);
 * ```
 */
export async function search(query: pb.IContactQuery, options: pb.IQueryOptions): Promise<string> {
  return TextileNode.searchContacts(
    Buffer.from(pb.ContactQuery.encode(query).finish()).toString('base64'),
    Buffer.from(pb.QueryOptions.encode(options).finish()).toString('base64'),
  )
}

/**
 * Cancel an ongoing contact search.
 * ```typescript
 * API.contacts.cancelSearch();
 * ```
 */
export async function cancelSearch(): Promise<void> {
  return TextileNode.cancelSearch()
}
