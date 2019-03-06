import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function register(url: string, token: string): Promise<void> {
  return await TextileNode.registerCafe(url, token)
}

export async function session(peerId: string): Promise<pb.ICafeSession | undefined> {
  const result = await TextileNode.cafeSession(peerId)
  if (!result) {
    return undefined
  }
  return pb.CafeSession.decode(Buffer.from(result, 'base64'))
}

export async function sessions(): Promise<pb.ICafeSessionList | undefined> {
  const result = await TextileNode.cafeSessions()
  if (!result) {
    return undefined
  }
  return pb.CafeSessionList.decode(Buffer.from(result, 'base64'))
}

export async function refreshSession(peerId: string): Promise<pb.ICafeSession | undefined> {
  const result = await TextileNode.refreshCafeSession(peerId)
  if (!result) {
    return undefined
  }
  return pb.CafeSession.decode(Buffer.from(result, 'base64'))
}

export async function deregister(id: string): Promise<void> {
  return await TextileNode.deregisterCafe(id)
}

export async function checkMessages(): Promise<void> {
  return await TextileNode.checkCafeMessages()
}
