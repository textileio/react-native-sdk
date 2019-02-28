import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Files {

  prepare = async (path: string, threadId: string): Promise<pb.IMobilePreparedFiles> => {
    const result = await TextileNode.prepareFiles(path, threadId)
    return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
  }

  prepareAsync = async (path: string, threadId: string): Promise<pb.IMobilePreparedFiles> => {
    const result = await TextileNode.prepareFilesAsync(path, threadId)
    return pb.MobilePreparedFiles.decode(Buffer.from(result, 'base64'))
  }

  add = async (dir: pb.IDirectory, threadId: string, caption?: string): Promise<pb.IBlock> => {
    const payload = Buffer.from(pb.Directory.encode(dir).finish()).toString('base64')
    const result = await TextileNode.addFiles(payload, threadId, caption)
    return pb.Block.decode(Buffer.from(result, 'base64'))
  }

  addByTarget = async (target: string, threadId: string, caption?: string): Promise<pb.IBlock> => {
    const result = await TextileNode.addFilesByTarget(target, threadId, caption)
    return pb.Block.decode(Buffer.from(result, 'base64'))
  }

  list = async (offset: string, limit: number, threadId?: string): Promise<pb.IFilesList> => {
    const result = await TextileNode.files(offset, limit, threadId)
    return pb.FilesList.decode(Buffer.from(result, 'base64'))
  }

  data = async (hash: string): Promise<pb.IMobileFileData> => {
    const result = await TextileNode.fileData(hash)
    return pb.MobileFileData.decode(Buffer.from(result, 'base64'))
  }

  // Note: pth is <target>/<index>, e.g., "Qm.../0"
  imageDataForMinWidth = async (pth: string, minWidth: number): Promise<pb.IMobileFileData> => {
    const result = await TextileNode.imageFileDataForMinWidth(pth, minWidth)
    return pb.MobileFileData.decode(Buffer.from(result, 'base64'))
  }

}
