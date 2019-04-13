import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  FileIndex,
  Node,
} from './model-internal'
import {
  IFileIndex,
  INode,
} from './model-public'

const { SchemasBridge } = NativeModules

/**
 * Add a new Schema for use when creating new Threads.
 * ```typescript
 * Textile.schemas.add(node);
 * ```
 */
export async function add(node: INode): Promise<IFileIndex> {
  const payload = Node.encode(node).finish()
  const result = await SchemasBridge.add(Buffer.from(payload).toString('base64'))
  return FileIndex.decode(Buffer.from(result, 'base64'))
}
