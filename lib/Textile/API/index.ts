import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { ISummary, Summary } from '@textile/go-mobile'
import Account from './account'
import Cafes from './cafes'
import Comments from './comments'
import Contacts from './contacts'
import Feed from './feed'
import Files from './files'
import Flags from './flags'
import Ignores from './ignores'
import Invites from './invites'
import Ipfs from './ipfs'
import Likes from './likes'
import Logs from './logs'
import Messages from './messages'
import Notifications from './notifications'
import Profile from './profile'
import Schemas from './schemas'
import Threads from './threads'
import Wallet from './wallet'

const { TextileNode } = NativeModules

export default class API {

  account = new Account()
  cafes = new Cafes()
  comments = new Comments()
  contacts = new Contacts()
  feed = new Feed()
  files = new Files()
  flags = new Flags()
  ignores = new Ignores()
  invites = new Invites()
  ipfs = new Ipfs()
  likes = new Likes()
  logs = new Logs()
  messages = new Messages()
  notifications = new Notifications()
  profile = new Profile()
  schemas = new Schemas()
  threads = new Threads()
  wallet = new Wallet()

  init = async (seed: string, repoPath: string, logToDisk: boolean, debug: boolean): Promise<void> => {
    return await TextileNode.initRepo(seed, repoPath, logToDisk, debug)
  }

  migrate = async (repoPath: string): Promise<void> => {
    await TextileNode.migrateRepo(repoPath)
  }

  create = async (repoPath: string, debug: boolean): Promise<void> => {
    await TextileNode.newTextile(repoPath, debug)
  }

  start = async (): Promise<void> => {
    await TextileNode.start()
  }

  stop = async (): Promise<void> => {
    await TextileNode.stop()
  }

  version = async (): Promise<string> => {
    const result = await TextileNode.version()
    return result as string
  }

  gitSummary = async (): Promise<string> => {
    const result = await TextileNode.gitSummary()
    return result as string
  }

  summary = async (): Promise<ISummary> => {
    const result = await TextileNode.summary()
    return Summary.decode(Buffer.from(result, 'base64'))
  }

}
