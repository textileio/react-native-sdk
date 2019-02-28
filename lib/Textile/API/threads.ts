import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Threads {

  add = async (config: pb.IAddThreadConfig): Promise<pb.IThread> => {
    const payload = pb.AddThreadConfig.encode(config).finish()
    const result = await TextileNode.addThread(payload)
    return pb.Thread.decode(Buffer.from(result, 'base64'))
  }

  addOrUpdate = async (thread: pb.IThread): Promise<void> => {
    const payload = pb.Thread.encode(thread).finish()
    return await TextileNode.addOrUpdateThread(payload)
  }

  get = async (threadId: string): Promise<pb.IThread> => {
    const result = await TextileNode.thread(threadId)
    return pb.Thread.decode(Buffer.from(result, 'base64'))
  }

  list = async (): Promise<pb.IThreadList> => {
    const result = await TextileNode.threads()
    return pb.ThreadList.decode(Buffer.from(result, 'base64'))
  }

  remove = async (id_: string): Promise<string> => {
    const result = await TextileNode.removeThread(id_)
    return result as string
  }

}
