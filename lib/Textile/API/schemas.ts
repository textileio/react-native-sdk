import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Schemas {

  add = async (jsonstr: string): Promise<pb.FileIndex> => {
    const result = await TextileNode.addSchema(jsonstr)
    return pb.FileIndex.decode(Buffer.from(result, 'base64'))
  }

}
