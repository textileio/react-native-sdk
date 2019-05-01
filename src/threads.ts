import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  AddThreadConfig,
  Thread,
  ThreadList,
  ContactList,
  ThreadSnapshotQuery,
  QueryOptions,
  IAddThreadConfig,
  IThread,
  IThreadList,
  IContactList,
  IThreadSnapshotQuery,
  IQueryOptions,
} from './model'

const { ThreadsBridge } = NativeModules

/**
 * Add a new Thread.
 * ```typescript
 * Textile.threads.add(config);
 * ```
 */
export async function add(config: IAddThreadConfig): Promise<IThread> {
  const payload = AddThreadConfig.encode(config).finish()
  const result = await ThreadsBridge.add(Buffer.from(payload).toString('base64'))
  return Thread.decode(Buffer.from(result, 'base64'))
}

/**
 * Add a Thread or update metadata if new.
 * ```typescript
 * Textile.threads.addOrUpdate(thread);
 * ```
 */
export async function addOrUpdate(thread: IThread): Promise<void> {
  const payload = Thread.encode(thread).finish()
  return ThreadsBridge.addOrUpdate(Buffer.from(payload).toString('base64'))
}

/**
 * Rename a Thread by ThreadId.
 * ```typescript
 * Textile.threads.rename(threadId, name);
 * ```
 */
export async function rename(threadId: string, name: string): Promise<void> {
  return ThreadsBridge.rename(threadId, name)
}

/**
 * Get Thread details by ThreadId.
 * ```typescript
 * Textile.threads.get(threadId);
 * ```
 */
export async function get(threadId: string): Promise<IThread | undefined> {
  const result = await ThreadsBridge.get(threadId)
  if (!result) {
    return undefined
  }
  return Thread.decode(Buffer.from(result, 'base64'))
}

/**
 * List all Threads.
 * ```typescript
 * Textile.threads.list();
 * ```
 */
export async function list(): Promise<IThreadList> {
  const result = await ThreadsBridge.list()
  return ThreadList.decode(Buffer.from(result, 'base64'))
}

/**
 * Request all Peers in a Thread by ThreadId.
 * ```typescript
 * Textile.threads.peers(threadId);
 * ```
 */
export async function peers(threadId: string): Promise<IContactList> {
  const result = await ThreadsBridge.peers(threadId)
  return ContactList.decode(Buffer.from(result, 'base64'))
}

/**
 * Remove a Thread by ThreadId.
 * ```typescript
 * Textile.threads.remove(id);
 * ```
 */
export async function remove(id_: string): Promise<string> {
  const result = await ThreadsBridge.remove(id_)
  return result as string
}

/**
 * Snapshot all threads for active cafe sessions.
 * ```typescript
 * Textile.threads.snapshot();
 * ```
 */
export async function snapshot(): Promise<void> {
  return ThreadsBridge.snapshot()
}

/**
 * Locate all Thread snapshots.
 * ```typescript
 * const snapshots = Textile.threads.searchSnapshots(query, options);
 * ```
 */
export async function searchSnapshots(query: IThreadSnapshotQuery, options: IQueryOptions): Promise<string> {
  return ThreadsBridge.searchSnapshots(
    Buffer.from(ThreadSnapshotQuery.encode(query).finish()).toString('base64'),
    Buffer.from(QueryOptions.encode(options).finish()).toString('base64'),
  )
}

/**
 * Cancel an ongoing thread snapshots search.
 * ```typescript
 * Textile.threads.cancelSearchSnapshots();
 * ```
 */
export async function cancelSearchSnapshots(): Promise<void> {
  return ThreadsBridge.cancelSearchSnapshots()
}
