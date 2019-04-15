import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  Summary,
  ISummary,
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

const  { TextileBridge } = NativeModules

/**
 * Initialize the Textile node, returnin the recovery phrase only the first time called
 * ```typescript
 * const recoveryPhrase = Textile.initialize(false, true);
 * ```
 */
export async function initialize(debug: boolean, logToDisk: boolean): Promise<string | undefined> {
  const result: string = await TextileBridge.initialize(debug, logToDisk)
  return result.length > 0 ? result : undefined
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
  util,
}
