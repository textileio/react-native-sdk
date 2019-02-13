import { AppStateStatus } from 'react-native'
import { NodeState } from './Bridge'

export interface BufferJSON {
  buffer: string
}

export interface CafeConfig {
  TEXTILE_CAFE_GATEWAY_URL: string
  TEXTILE_CAFE_TOKEN: string
  TEXTILE_CAFE_OVERRIDE?: string
}

export enum SchemaType {
  MEDIA = 'MEDIA',
  CAMERA_ROLL = 'CAMERA_ROLL',
  JSON = 'JSON'
}
export interface StoredNodeState {
  state: NodeState
  error?: string
}

export type TextileAppStateStatus = AppStateStatus | 'unknown' | 'backgroundFromForeground'
export interface TextileConfig {
  RELEASE_TYPE?: string
  SELF_MANAGE_APP_STATE?: boolean
}

export interface TextileOptions {
  debug?: boolean
}
