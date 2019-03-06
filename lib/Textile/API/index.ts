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
import * as wallet from './wallet'

const { TextileNode } = NativeModules

export async function init(seed: string, repoPath: string, logToDisk: boolean, debug: boolean): Promise<void> {
  return await TextileNode.initRepo(seed, repoPath, logToDisk, debug)
}

export async function migrate(repoPath: string): Promise<void> {
  await TextileNode.migrateRepo(repoPath)
}

export async function create(repoPath: string, debug: boolean): Promise<void> {
  await TextileNode.newTextile(repoPath, debug)
}

export async function start(): Promise<void> {
  await TextileNode.start()
}

export async function stop(): Promise<void> {
  await TextileNode.stop()
}

export async function version(): Promise<string> {
  const result = await TextileNode.version()
  return result as string
}

export async function gitSummary(): Promise<string> {
  const result = await TextileNode.gitSummary()
  return result as string
}

export async function summary(): Promise<pb.ISummary> {
  const result = await TextileNode.summary()
  return pb.Summary.decode(Buffer.from(result, 'base64'))
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
  wallet
}
