import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

export async function create(wordCount: number): Promise<string> {
  const result = await TextileNode.newWallet(wordCount)
  return result as string
}

export async function accountAt(phrase: string, index: number, password?: string): Promise<pb.IMobileWalletAccount> {
  const result = await TextileNode.walletAccountAt(phrase, index, password) // return seed and address
  return pb.MobileWalletAccount.decode(Buffer.from(result, 'base64'))
}
