import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  Summary,
  ISummary,
  IMobileWalletAccount,
  MobileWalletAccount
} from './model'
import * as account from './account'
import * as cafes from './cafes'
import * as comments from './comments'
import * as contacts from './contacts'
import * as feed from './feed'
import * as files from './files'
import * as flags from './flags'
import * as ignores from './ignores'
import * as invites from './invites'
import * as ipfs from './ipfs'
import * as likes from './likes'
import * as logs from './logs'
import * as messages from './messages'
import * as notifications from './notifications'
import * as profile from './profile'
import * as schemas from './schemas'
import * as threads from './threads'
import * as events from './events'
import * as util from './util'

const { TextileBridge } = NativeModules

/**
 * Create a new Textile wallet
 * @param wordCount The number of words the wallet recovery phrase should contain
 * @returns The new wallet recovery phrase Promise
 */
export async function newWallet(wordCount: number): Promise<string> {
  const phrase = await TextileBridge.newWallet(wordCount)
  return phrase
}

/**
 * Resolve a wallet account
 * @param phrase The wallet recovery phrase
 * @param index The index of the account to resolve
 * @param password The optional wallet password
 * @returns The wallet account Promise
 */
export async function walletAccountAt(
  phrase: string,
  index: number,
  password?: string
): Promise<IMobileWalletAccount> {
  const result = await TextileBridge.walletAccountAt(phrase, index, password)
  return MobileWalletAccount.decode(Buffer.from(result, 'base64'))
}

/**
 * Check if Textile is already initialized
 * @param repoPath The path to the Textile repo
 * @returns A boolean Promise value indicating if Textile is initialized or not
 */
export async function isInitialized(repoPath: string): Promise<boolean> {
  const result = await TextileBridge.isInitialized(repoPath)
  return result
}

/**
 * Initialize the shared Textile instance with an existing account seed
 * @param repoPath The path to the Textile repo
 * @param seed The account seed
 * @param debug Sets the log level to debug or not
 * @param logToDisk Whether or not to write Textile logs to disk
 */
export async function initialize(
  repoPath: string,
  seed: string,
  debug: boolean,
  logToDisk: boolean
): Promise<void> {
  return await TextileBridge.initialize(repoPath, seed, debug, logToDisk)
}

/**
 * Initialize the shared Textile instance, creating a new wallet
 * @param repoPath The path to the Textile repo
 * @param debug Sets the log level to debug or not
 * @param logToDisk Whether or not to write Textile logs to disk
 * @returns The wallet recovery phrase Promise
 */
export async function initializeCreatingNewWalletAndAccount(
  repoPath: string,
  debug: boolean,
  logToDisk: boolean
): Promise<string> {
  return await TextileBridge.initializeCreatingNewWalletAndAccount(
    repoPath,
    debug,
    logToDisk
  )
}

/**
 * After initialization is complete, launch Textile
 * @param repoPath The path to the Textile repo
 * @param debug Sets the log level to debug or not
 */
export async function launch(repoPath: string, debug: boolean): Promise<void> {
  return await TextileBridge.launch(repoPath, debug)
}

/**
 * Get the Textile node version
 * ```typescript
 * Textile.version();
 * ```
 */
export async function version(): Promise<string> {
  const result = await TextileBridge.version()
  return result as string
}

/**
 * Get the latest git summary
 * ```typescript
 * Textile.gitSummary();
 * ```
 */
export async function gitSummary(): Promise<string> {
  const result = await TextileBridge.gitSummary()
  return result as string
}

/**
 * Get the summary of node data
 * ```typescript
 * Textile.summary();
 * ```
 */
export async function summary(): Promise<ISummary> {
  const result = await TextileBridge.summary()
  return Summary.decode(Buffer.from(result, 'base64'))
}

export {
  account,
  cafes,
  comments,
  contacts,
  feed,
  files,
  flags,
  ignores,
  invites,
  ipfs,
  likes,
  logs,
  messages,
  notifications,
  profile,
  schemas,
  threads,
  events,
  util
}
