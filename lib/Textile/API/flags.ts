import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export default class Flags {

  add = async (blockId: string): Promise<string> => {
    const result = await TextileNode.addFlag(blockId) // returns hash
    return result as string
  }

}
