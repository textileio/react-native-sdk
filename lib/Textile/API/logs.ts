import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Logs {

  setLevel = async (level: pb.ILogLevel): Promise<void> => {
    const payload = pb.LogLevel.encode(level).finish()
    await TextileNode.setLogLevel(Buffer.from(payload).toString('base64'))
  }

}
