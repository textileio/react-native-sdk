import { NativeModules } from 'react-native'

const { TextileNode } = NativeModules

export default class Comments {

  add = async (blockId: string, body: string): Promise<string> => {
    const result = await TextileNode.addComment(blockId, body) // returns hash
    return result as string
  }

}
