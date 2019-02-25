import { AppStateStatus } from 'react-native'
import { pb } from './pb'

export interface ContactSearchResult {
  type: 'result'
  contact: pb.IContact,
  local: boolean
}

export interface ContactSearchError {
  type: 'error'
  error: string
}

export interface ContactSearchComplete {
  type: 'complete'
}

export type ContactSearchEvent = ContactSearchResult | ContactSearchError | ContactSearchComplete

export interface BufferJSON {
  buffer: string
}

export interface CafeConfig {
  TEXTILE_CAFE_GATEWAY_URL: string
  TEXTILE_CAFE_TOKEN: string
  TEXTILE_CAFE_OVERRIDE?: string
}

export enum NodeState {
  'nonexistent' = 'nonexistent',
  'creating' = 'creating',
  'created' = 'created', // Node has been created, on it's way to starting
  'starting' = 'starting',
  'started' = 'started',
  'stopping' = 'stopping',
  'stopped' = 'stopped', // Node has been explicitly stopped, different than created
  'creatingWallet' = 'creatingWallet',
  'derivingAccount' = 'derivingAccount',
  'initializingRepo' = 'initializingRepo',
  'walletInitSuccess' = 'walletInitSuccess',
  'postMigration' = 'postMigration'
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
