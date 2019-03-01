import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function add(jsonstr: string): Promise<pb.FileIndex> {
  const result = await TextileNode.addSchema(jsonstr)
  return pb.FileIndex.decode(Buffer.from(result, 'base64'))
}
