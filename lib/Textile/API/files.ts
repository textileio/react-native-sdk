import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules
/**
 * Use a Thread's Mill to prepare a file data for adding to a Thread.
 * ```typescript
 * API.files.prepareFiles(data, threadId);
 * ```
 */
export async function prepareFiles(data: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFiles(data, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}
/**
 * Use a Thread's Mill to synchronously prepare a file data for adding to a Thread.
 * ```typescript
 * API.files.prepareFiles(data, threadId);
 * ```
 */
export async function prepareFilesSync(data: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFilesSync(data, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}
/**
 * Use a Thread's Mill to prepare a raw file for adding to a Thread.
 * ```typescript
 * API.files.prepareFilesByPath(path, threadId);
 * ```
 */
export async function prepareFilesByPath(path: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFilesByPath(path, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}
/**
 * Use a Thread's Mill to synchronously prepare a raw file for adding to a Thread.
 * ```typescript
 * API.files.prepareFilesByPathSync(path, threadId);
 * ```
 */
export async function prepareFilesByPathSync(path: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFilesByPathSync(path, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}
/**
 * Add a file object to a Thread. Must match Thread schema definition.
 * ```typescript
 * API.files.add(dir, threadId);
 * ```
 */
export async function add(dir: pb.IDirectory, threadId: string, caption?: string): Promise<pb.IBlock> {
  const payload = pb.Directory.encode(dir).finish()
  const result = await TextileNode.addFiles(Buffer.from(payload).toString('base64'), threadId, caption)
  return pb.Block.decode(Buffer.from(result, 'base64'))
}
/**
 * Add a file by target.
 * ```typescript
 * API.files.addByTarget(target, threadId);
 * ```
 */
export async function addByTarget(target: string, threadId: string, caption?: string): Promise<pb.IBlock> {
  const result = await TextileNode.addFilesByTarget(target, threadId, caption)
  return pb.Block.decode(Buffer.from(result, 'base64'))
}
/**
 * List all files or files in a known Thread.
 * ```typescript
 * API.files.list(offset, limit);
 * ```
 */
export async function list(offset: string, limit: number, threadId?: string): Promise<pb.IFilesList> {
  const result = await TextileNode.files(offset, limit, threadId)
  return pb.FilesList.decode(Buffer.from(result, 'base64'))
}
/**
 * Get the raw data for a file at an IPFS hash.
 * ```typescript
 * API.files.fileData(hash);
 * ```
 */
export async function data(hash: string): Promise<string> {
  return await TextileNode.fileData(hash)
}

/**
 * Get the best size image from a Thread with MEDIA type thread given a minimum width.
 *
 * Note: pth is <target>/<index>, e.g., "Qm.../0"
 * ```typescript
 * API.files.imageDataForMinWidth(path, minWidth);
 * ```
 */
export async function imageDataForMinWidth(pth: string, minWidth: number): Promise<string> {
  return await TextileNode.imageFileDataForMinWidth(pth, minWidth)
}
