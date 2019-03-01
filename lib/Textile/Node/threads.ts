import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function add(config: pb.IAddThreadConfig): Promise<pb.IThread> {
  const payload = pb.AddThreadConfig.encode(config).finish()
  const result = await TextileNode.addThread(payload)
  return pb.Thread.decode(Buffer.from(result, 'base64'))
}

export async function addOrUpdate(thread: pb.IThread): Promise<void> {
  const payload = pb.Thread.encode(thread).finish()
  return await TextileNode.addOrUpdateThread(payload)
}

export async function get(threadId: string): Promise<pb.IThread> {
  const result = await TextileNode.thread(threadId)
  return pb.Thread.decode(Buffer.from(result, 'base64'))
}

export async function list(): Promise<pb.IThreadList> {
  const result = await TextileNode.threads()
  return pb.ThreadList.decode(Buffer.from(result, 'base64'))
}

export async function remove(id_: string): Promise<string> {
  const result = await TextileNode.removeThread(id_)
  return result as string
}
