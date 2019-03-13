import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules
/**
 * Use a Thread's Mill to prepare a raw file for adding to a Thread.
 */
export async function prepare(path: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFiles(path, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}
/**
 * prepare by async
 */
export async function prepareAsync(path: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFilesAsync(path, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}
/**
 * Add a file object to a Thread. Must match Thread schema definition.
 */
export async function add(dir: pb.IDirectory, threadId: string, caption?: string): Promise<pb.IBlock> {
  const payload = pb.Directory.encode(dir).finish()
  const result = await TextileNode.addFiles(Buffer.from(payload).toString('base64'), threadId, caption)
  return pb.Block.decode(Buffer.from(result, 'base64'))
}
/**
 * Add a file by target.
 */
export async function addByTarget(target: string, threadId: string, caption?: string): Promise<pb.IBlock> {
  const result = await TextileNode.addFilesByTarget(target, threadId, caption)
  return pb.Block.decode(Buffer.from(result, 'base64'))
}
/**
 * List all files or files in a known Thread.
 */
export async function list(offset: string, limit: number, threadId?: string): Promise<pb.IFilesList> {
  const result = await TextileNode.files(offset, limit, threadId)
  return pb.FilesList.decode(Buffer.from(result, 'base64'))
}
/**
 * Get the raw data for a file at an IPFS hash.
 */
export async function data(hash: string): Promise<string> {
  return await TextileNode.fileData(hash)
}

/**
 * Get the best size image from a Thread with MEDIA type thread given a minimum width.
 *
 * Note: pth is <target>/<index>, e.g., "Qm.../0"
 */
export async function imageDataForMinWidth(pth: string, minWidth: number): Promise<string> {
  return await TextileNode.imageFileDataForMinWidth(pth, minWidth)
}
