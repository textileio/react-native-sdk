import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

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

const { TextileNode } = NativeModules

/**
 * Initialize a new Textile Wallet
 * ```typescript
 * API.init(seed, repo, logToDisk, debug);
 * ```
 */
export async function init(seed: string, repoPath: string, logToDisk: boolean, debug: boolean): Promise<void> {
  return TextileNode.initRepo(seed, repoPath, logToDisk, debug)
}

/**
 * Manually migrate the repo to a new path.
 * @hidden
 */
export async function migrate(repoPath: string): Promise<void> {
  await TextileNode.migrateRepo(repoPath)
}

/**
 * Create the repo node. Handled by Textile.nodeCreate.
 * ```typescript
 * API.create(repo, debug);
 * ```
 */
export async function create(repoPath: string, debug: boolean): Promise<void> {
  await TextileNode.newTextile(repoPath, debug)
}

/**
 * Start the Textile Node. Handled by Textile.nodeStart.
 * ```typescript
 * API.start();
 * ```
 */
export async function start(): Promise<void> {
  await TextileNode.start()
}

/**
 * Stop the Textile Node.
 * ```typescript
 * API.stop();
 * ```
 */
export async function stop(): Promise<void> {
  await TextileNode.stop()
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
}
