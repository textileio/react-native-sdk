import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  LogLevel,
  ILogLevel,
} from './model'

const { LogsBridge } = NativeModules

/**
 * Set the logging level for the Textile node.
 * ```typescript
 * Textile.logs.setLevel(level);
 * ```
 */
export async function setLevel(level: ILogLevel): Promise<void> {
  const payload = LogLevel.encode(level).finish()
  await LogsBridge.setLevel(Buffer.from(payload).toString('base64'))
}
