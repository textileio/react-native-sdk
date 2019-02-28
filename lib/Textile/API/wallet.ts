import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import * as pb from '@textile/go-mobile'

const { TextileNode } = NativeModules

export default class Wallet {

  create = async (wordCount: number): Promise<string> => {
    const result = await TextileNode.newWallet(wordCount)
    return result as string
  }

  accountAt = async (phrase: string, index: number, password?: string): Promise<pb.IMobileWalletAccount> => {
    const result = await TextileNode.walletAccountAt(phrase, index, password) // return seed and address
    return pb.MobileWalletAccount.decode(Buffer.from(result, 'base64'))
  }

}
