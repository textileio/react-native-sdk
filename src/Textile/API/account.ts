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
 * Encrypt data with the account address.
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
 * Decrypt data previously encrypted with the account address.
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
 * List all own contact.
 *
 * ```typescript
 * const contact: pb.IContact = API.account.contact();
 * ```
 */
export async function contact(): Promise<pb.IContact | undefined> {
  const result = await TextileNode.accountContact()
  if (!result) {
    return undefined
  }
  return pb.Contact.decode(Buffer.from(result, 'base64'))
}

/**
 * Search and apply account thread snapshots.
 * ```typescript
 * API.account.sync(options);
 * ```
 * @hidden
 */
export async function sync(options: pb.IQueryOptions): Promise<string> {
  return TextileNode.syncAccount(
    Buffer.from(pb.QueryOptions.encode(options).finish()).toString('base64'),
  )
}

/**
 * Cancel an ongoing Thread backup search.
 */
export async function cancelFindThreadBackups(): Promise<void> {
  return TextileNode.cancelFindThreadBackups()
}
