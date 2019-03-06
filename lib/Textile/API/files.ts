import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function prepare(path: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFiles(path, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}

export async function prepareAsync(path: string, threadId: string): Promise<pb.IMobilePreparedFiles> {
  const result = await TextileNode.prepareFilesAsync(path, threadId)
  return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
}

export async function add(dir: pb.IDirectory, threadId: string, caption?: string): Promise<pb.IBlock> {
  const payload = Buffer.from(pb.Directory.encode(dir).finish()).toString('base64')
  const result = await TextileNode.addFiles(payload, threadId, caption)
  return pb.Block.decode(Buffer.from(result, 'base64'))
}

export async function addByTarget(target: string, threadId: string, caption?: string): Promise<pb.IBlock> {
  const result = await TextileNode.addFilesByTarget(target, threadId, caption)
  return pb.Block.decode(Buffer.from(result, 'base64'))
}

export async function list(offset: string, limit: number, threadId?: string): Promise<pb.IFilesList> {
  const result = await TextileNode.files(offset, limit, threadId)
  return pb.FilesList.decode(Buffer.from(result, 'base64'))
}

export async function data(hash: string): Promise<string> {
  return await TextileNode.fileData(hash)
}

// Note: pth is <target>/<index>, e.g., "Qm.../0"
export async function imageDataForMinWidth(pth: string, minWidth: number): Promise<string> {
  return await TextileNode.imageFileDataForMinWidth(pth, minWidth)
}
