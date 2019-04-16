import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  Contact,
  ContactList,
  ThreadList,
  ContactQuery,
  QueryOptions,
  IContact,
  IContactList,
  IThreadList,
  IContactQuery,
  IQueryOptions,
} from './model'

const { ContactsBridge } = NativeModules

/**
 * Add a new Contact after fetching the Contact information.
 */
export async function add(contact: IContact): Promise<void> {
  const payload = Contact.encode(contact).finish()
  await ContactsBridge.add(Buffer.from(payload).toString('base64'))
}

/**
 * Get Contact information by address.
 */
export async function get(address: string): Promise<IContact | undefined> {
  const result: string = await ContactsBridge.get(address)
  if (result.length === 0) {
    return undefined
  }
  return Contact.decode(Buffer.from(result, 'base64'))
}

/**
 * List all known Contacts.
 */
export async function list(): Promise<IContactList> {
  const result = await ContactsBridge.list()
  return ContactList.decode(Buffer.from(result, 'base64'))
}

/**
 * Remove a Contact by their address.
 */
export async function remove(address: string): Promise<void> {
  return ContactsBridge.remove(address)
}

/**
 * List all Threads in common with a Contact.
 * ```typescript
 * Textile.contacts.threads(address);
 * ```
 */
export async function threads(address: string): Promise<IThreadList> {
  const result = await ContactsBridge.threads(address)
  return ThreadList.decode(Buffer.from(result, 'base64'))
}

/**
 * Search for Contacts over network.
 * ```typescript
 * Textile.contacts.search(query, options);
 * ```
 */
export async function search(query: IContactQuery, options: IQueryOptions): Promise<string> {
  return ContactsBridge.search(
    Buffer.from(ContactQuery.encode(query).finish()).toString('base64'),
    Buffer.from(QueryOptions.encode(options).finish()).toString('base64'),
  )
}

/**
 * Cancel an ongoing contact search.
 * ```typescript
 * Textile.contacts.cancelSearch();
 * ```
 */
export async function cancelSearch(): Promise<void> {
  return ContactsBridge.cancelSearch()
}
