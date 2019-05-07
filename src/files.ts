import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  MobilePreparedFiles,
  Directory,
  Block,
  FilesList,
  IMobilePreparedFiles,
  IDirectory,
  IBlock,
  IFilesList,
} from './model'

const { FilesBridge } = NativeModules

/**
 * Use a Thread's Mill to prepare a file data (as bse64 string)  for adding to a Thread.
 * ```typescript
 * Textile.files.prepare(data, threadId);
 * ```
 */
export async function prepare(data: string, threadId: string): Promise<IMobilePreparedFiles> {
  const result = await FilesBridge.prepare(data, threadId)
  return MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}

/**
 * Use a Thread's Mill to synchronously prepare a file data (as bse64 string) for adding to a Thread.
 * ```typescript
 * Textile.files.prepareSync(data, threadId);
 * ```
 */
export async function prepareSync(data: string, threadId: string): Promise<IMobilePreparedFiles> {
  const result = await FilesBridge.prepareSync(data, threadId)
  return MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}

/**
 * Use a Thread's Mill to prepare a file for adding to a Thread.
 * ```typescript
 * Textile.files.prepareByPath(path, threadId);
 * ```
 */
export async function prepareByPath(path: string, threadId: string): Promise<IMobilePreparedFiles> {
  const result = await FilesBridge.prepareByPath(path, threadId)
  return MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}

/**
 * Use a Thread's Mill to synchronously prepare a file for adding to a Thread.
 * ```typescript
 * Textile.files.prepareByPathSync(path, threadId);
 * ```
 */
export async function prepareByPathSync(path: string, threadId: string): Promise<IMobilePreparedFiles> {
  const result = await FilesBridge.prepareByPathSync(path, threadId)
  return MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}

/**
 * Add a file object to a Thread. Must match Thread schema definition.
 * ```typescript
 * Textile.files.add(dir, threadId);
 * ```
 */
export async function add(dir: IDirectory, threadId: string, caption?: string): Promise<IBlock> {
  const payload = Directory.encode(dir).finish()
  const result = await FilesBridge.add(Buffer.from(payload).toString('base64'), threadId, caption)
  return Block.decode(Buffer.from(result, 'base64'))
}

/**
 * Add a file by target.
 * ```typescript
 * Textile.files.addByTarget(target, threadId);
 * ```
 */
export async function addByTarget(target: string, threadId: string, caption?: string): Promise<IBlock> {
  const result = await FilesBridge.addByTarget(target, threadId, caption)
  return Block.decode(Buffer.from(result, 'base64'))
}

/**
 * List all files or files in a known Thread.
 * ```typescript
 * Textile.files.list(offset, limit);
 * ```
 */
export async function list(threadId: string, offset: string, limit: number): Promise<IFilesList> {
  const result = await FilesBridge.list(threadId, offset, limit)
  return FilesList.decode(Buffer.from(result, 'base64'))
}

/**
 * Get the raw data for a file at an IPFS hash.
 * ```typescript
 * Textile.files.data(hash);
 * ```
 */
export async function data(hash: string): Promise<string> {
  return FilesBridge.data(hash)
}

/**
 * Get the best size image from a Thread with MEDIA type thread given a minimum width.
 *
 * Note: pth is <target>/<index>, e.g., "Qm.../0"
 * ```typescript
 * Textile.files.imageDataForMinWidth(path, minWidth);
 * ```
 */
export async function imageDataForMinWidth(pth: string, minWidth: number): Promise<string> {
  return FilesBridge.imageDataForMinWidth(pth, minWidth)
}
