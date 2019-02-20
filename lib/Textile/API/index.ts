import {EmitterSubscription, NativeModules} from 'react-native'
import {Buffer} from 'buffer'
import NativeEvents from '../../NativeEvents'

import {
  File,
  BlockInfo,
  BufferJSON,
  ContactInfo,
  ContactInfoQueryResult,
  ExternalInvite,
  FileData,
  LogLevel,
  NotificationInfo,
  Overview,
  SchemaType,
  ThreadInfo,
  ThreadSharing,
  ThreadType,
  WalletAccount
} from '../Models'

import { pb } from '../Models'

import {
  convertDirectoryData,
  convertContactQueryData,
  convertContactQueryOptionsData
} from '../Models/util'

const { TextileNode } = NativeModules

class API {
  /**
   * Returns the hash of the initial join block. Not the threadId of the final thread created/joined
   */
  acceptExternalInvite = async (id_: string, key: string): Promise<string> => {
    const result = await TextileNode.acceptExternalInvite(id_, key) // returns hash
    return result as string
  }

  acceptInviteViaNotification = async (id_: string): Promise<string> => {
    const result = await TextileNode.acceptInviteViaNotification(id_) // returns addr
    return result as string
  }

  addContact = async (contact: ContactInfo): Promise<void> => {
    const contactJsonString = JSON.stringify(contact)
    await TextileNode.addContact(contactJsonString)
  }

  addExternalInvite = async (threadId: string): Promise<ExternalInvite> => {
    const result = await TextileNode.addExternalInvite(threadId)
    return JSON.parse(result) as ExternalInvite
  }

  addSchema = async (jsonstr: string): Promise<File> => {
    const result = await TextileNode.addSchema(jsonstr)
    return JSON.parse(result) as File
  }

  addThread = async (key: string, name: string, type: ThreadType, sharing: ThreadSharing, members: string[], schema_type: SchemaType, schema_json?: string): Promise<ThreadInfo> => {
    const stringMembers = members.join(',')
    const media = schema_type === SchemaType.MEDIA
    const cameraRoll = !media && schema_type === SchemaType.CAMERA_ROLL
    const schema = schema_type === SchemaType.JSON && schema_json ? schema_json : ''
    const result = await TextileNode.addThread(key, name, type, sharing, stringMembers, schema, media, cameraRoll)
    return JSON.parse(result) as ThreadInfo
  }

  addComment = async (blockId: string, body: string): Promise<string> => {
    const result = await TextileNode.addComment(blockId, body) // returns hash
    return result as string
  }

  addFiles = async (dir: pb.Directory.AsObject, threadId: string, caption?: string): Promise<BlockInfo> => {
    const directoryInstance = convertDirectoryData(dir)
    const byteArray = directoryInstance.serializeBinary()
    const buffer = Buffer.from(byteArray)
    const base64 = buffer.toString('base64')
    const result = await TextileNode.addFiles(base64, threadId, caption)
    return JSON.parse(result) as BlockInfo
  }

  addFilesByTarget = async (target: string, threadId: string, caption?: string): Promise<BlockInfo> => {
    const result = await TextileNode.addFilesByTarget(target, threadId, caption)
    return JSON.parse(result) as BlockInfo
  }

  addIgnore = async (blockId: string): Promise<string> => {
    const result = await TextileNode.addIgnore(blockId) // returns hash
    return result as string
  }

  addInvite = async (threadId: string, inviteeId: string): Promise<string> => {
    const result = await TextileNode.addInvite(threadId, inviteeId) // returns hash
    return result as string
  }

  addLike = async (blockId: string): Promise<string> => {
    const result = await TextileNode.addLike(blockId) // returns hash
    return result as string
  }

  addMessage = async (threadId: string, body: string): Promise<string> => {
    const result = await TextileNode.addMessage(threadId, body) // returns hash
    return result as string
  }

  address = async (): Promise<string> => {
    const result = await TextileNode.address()
    return result as string
  }

  avatar = async (): Promise<string | undefined> => {
    const result: string = await TextileNode.avatar()
    return result.length > 0 ? result : undefined
  }

  cafeSession = async (peerId: string): Promise<pb.CafeSession.AsObject | undefined> => {
    const result = await TextileNode.cafeSession(peerId)
    if (!result) {
      return undefined
    }
    const buffer = Buffer.from(result, 'base64')
    return pb.CafeSession.deserializeBinary(buffer).toObject()
  }

  cafeSessions = async (): Promise<pb.CafeSessions.AsObject | undefined> => {
    const result = await TextileNode.cafeSessions()
    if (!result) {
      return undefined
    }
    const buffer = Buffer.from(result, 'base64')
    return pb.CafeSessions.deserializeBinary(buffer).toObject()
  }

  checkCafeMessages = async (): Promise<void> => {
    await TextileNode.checkCafeMessages()
  }

  contact = async (id_: string): Promise<ContactInfo> => {
    const result = await TextileNode.contact(id_)
    return JSON.parse(result) as ContactInfo
  }

  contactThreads = async (id_: string): Promise<ReadonlyArray<ThreadInfo>> => {
    const result = await TextileNode.contactThreads(id_)
    return JSON.parse(result) as ReadonlyArray<ThreadInfo>
  }

  contacts = async (): Promise<ReadonlyArray<ContactInfo>> => {
    const result = await TextileNode.contacts()
    return JSON.parse(result) as ReadonlyArray<ContactInfo>
  }

  countUnreadNotifications = async (): Promise<number> => {
    const result = await TextileNode.countUnreadNotifications()
    return result as number
  }

  deregisterCafe = async (peerId: string): Promise<void> => {
    await TextileNode.deregisterCafe(peerId)
  }

  fileData = async (hash: string): Promise<FileData> => {
    const result = await TextileNode.fileData(hash)
    return JSON.parse(result) as FileData
  }

  findContact = async (username: string, limit: number, wait: number): Promise<ContactInfoQueryResult> => {
    const result = await TextileNode.findContact(username, limit, wait)
    return JSON.parse(result) as ContactInfoQueryResult
  }

  ignoreInviteViaNotification = async (id_: string): Promise<string> => {
    const result = await TextileNode.ignoreInviteViaNotification(id_)
    return result as string
  }

  // Note: pth is <target>/<index>, e.g., "Qm.../0"
  imageFileDataForMinWidth = async (pth: string, minWidth: number): Promise<FileData> => {
    const result = await TextileNode.imageFileDataForMinWidth(pth, minWidth)
    return JSON.parse(result) as FileData
  }

  notifications = async (offset: string, limit: number): Promise<ReadonlyArray<NotificationInfo>> => {
    const result = await TextileNode.notifications(offset, limit)
    return JSON.parse(result) as ReadonlyArray<NotificationInfo>
  }

  overview = async (): Promise<Overview> => {
    const result = await TextileNode.overview()
    return JSON.parse(result) as Overview
  }

  peerId = async (): Promise<string> => {
    const result = await TextileNode.peerId()
    return result as string
  }

  prepareFiles = async (path: string, threadId: string): Promise<pb.MobilePreparedFiles.AsObject> => {
    const result = await TextileNode.prepareFiles(path, threadId)
    const buffer = Buffer.from(result, 'base64')
    return pb.MobilePreparedFiles.deserializeBinary(buffer).toObject()
  }

  prepareFilesAsync = async (path: string, threadId: string): Promise<pb.MobilePreparedFiles.AsObject> => {
    const result = await TextileNode.prepareFilesAsync(path, threadId)
    const buffer = Buffer.from(result, 'base64')
    return pb.MobilePreparedFiles.deserializeBinary(buffer).toObject()
  }

  profile = async (): Promise<ContactInfo> => {
    const result = await TextileNode.profile()
    return JSON.parse(result) as ContactInfo
  }

  readAllNotifications = async (): Promise<void> => {
    await TextileNode.readAllNotifications()
  }

  readNotification = async (id_: string): Promise<void> => {
    await TextileNode.readNotification(id_)
  }

  refreshCafeSession = async (peerId: string): Promise<pb.CafeSession.AsObject | undefined> => {
    const result = await TextileNode.refreshCafeSession(peerId)
    if (!result) {
      return undefined
    }
    const buffer = Buffer.from(result, 'base64')
    return pb.CafeSession.deserializeBinary(buffer).toObject()
  }

  registerCafe = async (peerId: string, token: string): Promise<void> => {
    await TextileNode.registerCafe(peerId, token)
  }

  removeThread = async (id_: string): Promise<string> => {
    const result = await TextileNode.removeThread(id_) // returns hash b58 string
    return result as string
  }

  searchContacts = async (query: pb.ContactQuery.AsObject, options: pb.QueryOptions.AsObject, handler: (contact: pb.Contact.AsObject, local: boolean) => void): Promise<{}> => {
    return new Promise(async (resolve, reject) => {
      // internal contact search result handler
      let stream: EmitterSubscription
      let streamError: EmitterSubscription
      // just a helper to dedup below
      const cleanup = () => {
        if (stream) {
          stream.remove()
        }
        if (streamError) {
          streamError.remove()
        }
      }
      // wrap in a try to ensure we cleanup if an error
      try {
        stream = NativeEvents.addListener('@textile/sdk/searchContactsResult', (payload: BufferJSON) => {
          const result = payload.buffer
          if (!result) {
              return
          }
          const buffer = Buffer.from(result, 'base64')
          const queryEvent = pb.QueryEvent.deserializeBinary(buffer).toObject()
          switch (queryEvent.type) {
            case pb.QueryEvent.Type.DATA:
              if (queryEvent.data && queryEvent.data.value && queryEvent.data.value.value && typeof queryEvent.data.value.value !== 'string') {
                const contact = pb.Contact.deserializeBinary(queryEvent.data.value.value).toObject()
                handler(contact, !!queryEvent.data.local)
              }
              break
            case pb.QueryEvent.Type.DONE:
              cleanup()
              resolve()
              break
          }
        })
        streamError = NativeEvents.addListener('@textile/sdk/searchContactsError', (payload: any) => {
          cleanup()
          reject(payload)
        })

        const queryInstance = convertContactQueryData(query)
        const queryArray = queryInstance.serializeBinary()
        const queryBuffer = Buffer.from(queryArray)
        const queryString = queryBuffer.toString('base64')

        const optionsInstance = convertContactQueryOptionsData(options)
        const optionsArray = optionsInstance.serializeBinary()
        const optionsBuffer = Buffer.from(optionsArray)
        const optionsString = optionsBuffer.toString('base64')

        await TextileNode.searchContacts(queryString, optionsString)
      } catch (error) {
        // specifically not finally here, because it should return before listeners complete
        cleanup()
        reject(error)
      }
    })
  }

  cancelSearchContacts = async (): Promise<void> => {
    await TextileNode.cancelSearchContacts()
  }

  seed = async (): Promise<string> => {
    const result = await TextileNode.seed()
    return result as string
  }

  setAvatar = async (id_: string): Promise<void> => {
    await TextileNode.setAvatar(id_)
  }

  setLogLevels = async (levels: Map<string, LogLevel>): Promise<void> => {
    await TextileNode.setLogLevels(levels)
  }

  setUsername = async (username: string): Promise<void> => {
    await TextileNode.setUsername(username)
  }

  start = async (): Promise<void> => {
    await TextileNode.start()
  }

  stop = async (): Promise<void> => {
    await TextileNode.stop()
  }

  feed = async (offset: string, limit: number, mode: pb.FeedMode, threadId?: string): Promise<pb.FeedItemList.AsObject> => {
    const result = await TextileNode.feed(offset, limit, mode, threadId)
    const buffer = Buffer.from(result, 'base64')
    return pb.FeedItemList.deserializeBinary(buffer).toObject()
  }

  files = async (offset: string, limit: number, threadId?: string): Promise<pb.FilesList.AsObject> => {
    const result = await TextileNode.files(offset, limit, threadId)
    const buffer = Buffer.from(result, 'base64')
    return pb.FilesList.deserializeBinary(buffer).toObject()
  }

  messages = async (offset: string, limit: number, threadId?: string): Promise<pb.TextList.AsObject> => {
    const result = await TextileNode.messages(offset, limit, threadId)
    const buffer = Buffer.from(result, 'base64')
    return pb.TextList.deserializeBinary(buffer).toObject()
  }

  threadInfo = async (threadId: string): Promise<ThreadInfo> => {
    const result = await TextileNode.threadInfo(threadId)
    return JSON.parse(result) as ThreadInfo
  }

  threads = async (): Promise<ReadonlyArray<ThreadInfo>> => {
    const result = await TextileNode.threads()
    return JSON.parse(result) as ReadonlyArray<ThreadInfo>
  }

  username = async (): Promise<string | undefined> => {
    const result: string = await TextileNode.username()
    return result.length > 0 ? result : undefined
  }

  version = async (): Promise<string> => {
    const result = await TextileNode.version()
    return result as string
  }

  // Order of things to init and create the repo:
  // MobileNewTextile If error, inspect it and run next steps or migration
  // MobileNewWallet returns recovery phrase
  // MobileWalletAccountAt returns seed and address
  // MobileInitRepo only run one time ever
  // MobileNewTextile

  initRepo = async (seed: string, repoPath: string, logToDisk: boolean, debug: boolean): Promise<void> => {
    return await TextileNode.initRepo(seed, repoPath, logToDisk, debug)
  }

  migrateRepo = async (repoPath: string): Promise<void> => {
    await TextileNode.migrateRepo(repoPath)
  }

  newTextile = async (repoPath: string, debug: boolean): Promise<void> => {
    await TextileNode.newTextile(repoPath, debug)
  }

  newWallet = async (wordCount: number): Promise<string> => {
    const result = await TextileNode.newWallet(wordCount)
    return result as string
  }

  walletAccountAt = async (phrase: string, index: number, password?: string): Promise<WalletAccount> => {
    const result = await TextileNode.walletAccountAt(phrase, index, password) // return seed and address
    return JSON.parse(result) as WalletAccount
  }
}

export default API
