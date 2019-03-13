import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Add a new Thread.
 */
export async function add(config: pb.IAddThreadConfig): Promise<pb.IThread> {
  const payload = pb.AddThreadConfig.encode(config).finish()
  const result = await TextileNode.addThread(Buffer.from(payload).toString('base64'))
  return pb.Thread.decode(Buffer.from(result, 'base64'))
}

/**
 * Add a Thread or update metadata if new.
 */
export async function addOrUpdate(thread: pb.IThread): Promise<void> {
  const payload = pb.Thread.encode(thread).finish()
  return await TextileNode.addOrUpdateThread(Buffer.from(payload).toString('base64'))
}

/**
 * Rename a Thread by ThreadId.
 */
export async function renameThread(threadId: string, name: string): Promise<void> {
  return await TextileNode.renameThread(threadId, name)
}
/**
 * Get Thread details by ThreadId.
 */
export async function get(threadId: string): Promise<pb.IThread> {
  const result = await TextileNode.thread(threadId)
  return pb.Thread.decode(Buffer.from(result, 'base64'))
}

/**
 * List all Threads.
 */
export async function list(): Promise<pb.IThreadList> {
  const result = await TextileNode.threads()
  return pb.ThreadList.decode(Buffer.from(result, 'base64'))
}

/**
 * Request all Peers in a Thread by ThreadId.
 */
export async function peers(threadId: string): Promise<pb.IContactList> {
  const result = await TextileNode.peers(threadId)
  return pb.ContactList.decode(Buffer.from(result, 'base64'))
}
/**
 * Remove a Thread by ThreadId.
 */
export async function remove(id_: string): Promise<string> {
  const result = await TextileNode.removeThread(id_)
  return result as string
}
