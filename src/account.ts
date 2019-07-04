import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import { Contact, IContact, QueryOptions, IQueryOptions } from './model'

const { AccountBridge } = NativeModules

/**
 * Get the account address.
 *
 * ```typescript
 * const address = Textile.account.address();
 * ```
 */
export async function address(): Promise<string> {
  const result = await AccountBridge.address()
  return result as string
}

/**
 * Get the account seed phrase to display to user.
 *
 * ```typescript
 * const seed = Textile.account.seed();
 * ```
 */
export async function seed(): Promise<string> {
  const result = await AccountBridge.seed()
  return result as string
}

/**
 * Encrypt data with the account address.
 *
 * ```typescript
 * const encrypted = Textile.account.encrypt(Buffer.from(JSON.stringify({foo:"bar"})));
 * ```
 */
export async function encrypt(input: Buffer): Promise<Buffer> {
  const result = await AccountBridge.encrypt(input.toString('base64'))
  return Buffer.from(result, 'base64')
}

/**
 * Decrypt data previously encrypted with the account address.
 *
 * ```typescript
 * const decrypted = Textile.account.decrypt(encrypted);
 * ```
 */
export async function decrypt(input: Buffer): Promise<Buffer> {
  const result = await AccountBridge.decrypt(input.toString('base64'))
  return Buffer.from(result, 'base64')
}

/**
 * List all own contact.
 *
 * ```typescript
 * const contact: IContact = Textile.account.contact();
 * ```
 */
export async function contact(): Promise<IContact> {
  const result = await AccountBridge.contact()
  return Contact.decode(Buffer.from(result, 'base64'))
}

/**
 * Search and apply account thread snapshots.
 * ```typescript
 * Textile.account.sync(options);
 * ```
 */
export async function sync(options: IQueryOptions): Promise<string> {
  return AccountBridge.sync(
    Buffer.from(QueryOptions.encode(options).finish()).toString('base64')
  )
}

/**
 * Cancel an ongoing Thread backup search.
 * ```typescript
 * Textile.account.cancelSync();
 * ```
 */
export async function cancelSync(): Promise<void> {
  return AccountBridge.cancelSync()
}
