import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Add a new Thread.
 * ```typescript
 * API.threads.add(config);
 * ```
 */
export async function add(config: pb.IAddThreadConfig): Promise<pb.IThread> {
  const payload = pb.AddThreadConfig.encode(config).finish()
  const result = await TextileNode.addThread(Buffer.from(payload).toString('base64'))
  return pb.Thread.decode(Buffer.from(result, 'base64'))
}

/**
 * Add a Thread or update metadata if new.
 * ```typescript
 * API.threads.addOrUpdate(thread);
 * ```
 */
export async function addOrUpdate(thread: pb.IThread): Promise<void> {
  const payload = pb.Thread.encode(thread).finish()
  return TextileNode.addOrUpdateThread(Buffer.from(payload).toString('base64'))
}

/**
 * Rename a Thread by ThreadId.
 * ```typescript
 * API.threads.rename(threadId, name);
 * ```
 */
export async function rename(threadId: string, name: string): Promise<void> {
  return TextileNode.renameThread(threadId, name)
}
/**
 * Get Thread details by ThreadId.
 * ```typescript
 * API.threads.get(threadId);
 * ```
 */
export async function get(threadId: string): Promise<pb.IThread> {
  const result = await TextileNode.thread(threadId)
  return pb.Thread.decode(Buffer.from(result, 'base64'))
}

/**
 * List all Threads.
 * ```typescript
 * API.threads.list();
 * ```
 */
export async function list(): Promise<pb.IThreadList> {
  const result = await TextileNode.threads()
  return pb.ThreadList.decode(Buffer.from(result, 'base64'))
}

/**
 * Request all Peers in a Thread by ThreadId.
 * ```typescript
 * API.threads.peers(threadId);
 * ```
 */
export async function peers(threadId: string): Promise<pb.IContactList> {
  const result = await TextileNode.threadPeers(threadId)
  return pb.ContactList.decode(Buffer.from(result, 'base64'))
}
/**
 * Remove a Thread by ThreadId.
 * ```typescript
 * API.threads.remove(id);
 * ```
 */
export async function remove(id_: string): Promise<string> {
  const result = await TextileNode.removeThread(id_)
  return result as string
}

/**
 * Locate all Thread snapshots.
 * ```typescript
 * const snapshots = API.threads.searchSnapshots(query, options);
 * ```
 * @hidden
 */
export async function searchSnapshots(query: pb.IThreadSnapshotQuery, options: pb.IQueryOptions): Promise<string> {
  return TextileNode.searchThreadSnapshots(
    Buffer.from(pb.ThreadSnapshotQuery.encode(query).finish()).toString('base64'),
    Buffer.from(pb.QueryOptions.encode(options).finish()).toString('base64'),
  )
}
