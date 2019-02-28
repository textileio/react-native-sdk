import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export default class Ignores {

  add = async (blockId: string): Promise<string> => {
    const result = await TextileNode.addIgnore(blockId) // returns hash
    return result as string
  }

}
