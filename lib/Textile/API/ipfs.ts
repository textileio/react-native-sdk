import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export default class Ipfs {

  peerId = async (): Promise<string> => {
    const result = await TextileNode.peerId()
    return result as string
  }

}
