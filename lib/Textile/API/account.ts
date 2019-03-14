import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Get the account address.
 *
 * ```typescript
 * const address = API.account.address();
 * ```
 */
export async function address(): Promise<string> {
  const result = await TextileNode.address()
  return result as string
}

/**
 * Get the account seed phrase to display to user.
 *
 * ```typescript
 * const seed = API.account.seed();
 * ```
 */
export async function seed(): Promise<string> {
  const result = await TextileNode.seed()
  return result as string
}

/**
 * Encrypt any file with the account address.
 *
 * ```typescript
 * const encrypted = API.account.encrypt(Buffer.from(JSON.stringify({foo:"bar"})));
 * ```
 */
export async function encrypt(input: Buffer): Promise<Buffer> {
  const result = await TextileNode.encrypt(input.toString('base64'))
  return Buffer.from(result, 'base64')
}

/**
 * Decrypt a file previously encrypted with the account address.
 *
 * ```typescript
 * const decrypted = API.account.decrypt(encrypted);
 * ```
 */
export async function decrypt(input: Buffer): Promise<Buffer> {
  const result = await TextileNode.decrypt(input.toString('base64'))
  return Buffer.from(result, 'base64')
}

/**
 * List all Contacts.
 *
 * ```typescript
 * const contacts: pb.IContactList = API.account.peers();
 * ```
 */
export async function peers(): Promise<pb.IContactList> {
  const result = await TextileNode.accountPeers()
  return pb.ContactList.decode(Buffer.from(result, 'base64'))
}

/**
 * Locate all Thread backups.
 * ```typescript
 * const backups = API.account.findThreadBackups(query, options);
 * ```
 * @hidden
 */
export async function findThreadBackups(query: pb.IThreadBackupQuery, options: pb.IQueryOptions): Promise<string> {
  return TextileNode.findThreadBackups(
    Buffer.from(pb.ThreadBackupQuery.encode(query).finish()).toString('base64'),
    Buffer.from(pb.QueryOptions.encode(options).finish()).toString('base64')
  )
}

/**
 * Cancel an ongoing Thread backup search.
 */
export async function cancelFindThreadBackups(): Promise<void> {
  return await TextileNode.cancelFindThreadBackups()
}
