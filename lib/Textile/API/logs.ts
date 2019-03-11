import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Set the logging level for the Textile node.
 */
export async function setLevel(level: pb.ILogLevel): Promise<void> {
  const payload = pb.LogLevel.encode(level).finish()
  await TextileNode.setLogLevel(Buffer.from(payload).toString('base64'))
}
