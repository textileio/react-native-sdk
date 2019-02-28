import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export default class Likes {

  add = async (blockId: string): Promise<string> => {
    const result = await TextileNode.addLike(blockId) // returns hash
    return result as string
  }

}
