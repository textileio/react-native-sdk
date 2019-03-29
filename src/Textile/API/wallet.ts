import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'
import { pb } from '../Models'

const { TextileNode } = NativeModules

/**
 * Create the Textile Wallet. Handled by Textile.nodeCreate.
 * ```typescript
 * API.wallet.create(wordCount);
 * ```
 */
export async function create(wordCount: number): Promise<string> {
  const result = await TextileNode.newWallet(wordCount)
  return result as string
}

/**
 * Get Account information from Wallet.
 * ```typescript
 * API.wallet.accountAt(phrase, index);
 * ```
 */
export async function accountAt(phrase: string, index: number, password?: string): Promise<pb.IMobileWalletAccount> {
  const result = await TextileNode.walletAccountAt(phrase, index, password) // return seed and address
  return pb.MobileWalletAccount.decode(Buffer.from(result, 'base64'))
}
