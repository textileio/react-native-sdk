import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Add a new Schema for use when creating new Threads.
 */
export async function add(node: pb.INode): Promise<pb.FileIndex> {
  const payload = pb.Node.encode(node).finish()
  const result = await TextileNode.addSchema(Buffer.from(payload).toString('base64'))
  return pb.FileIndex.decode(Buffer.from(result, 'base64'))
}
