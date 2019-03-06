import { AppStateStatus } from 'react-native'

export interface DiscoveredCafe {
  readonly peer: string
  readonly address: string
  readonly api: string
  readonly protocol: string
  readonly node: string
  readonly url: string
}

export interface DiscoveredCafes {
  readonly primary: DiscoveredCafe
  readonly secondary: DiscoveredCafe
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

export interface StoredNodeState {
  state: NodeState
  error?: string
}

export type TextileAppStateStatus = AppStateStatus | 'unknown' | 'backgroundFromForeground'

// TODO: remove capitalization
export interface TextileConfig {
  RELEASE_TYPE?: string
  SELF_MANAGE_APP_STATE?: boolean
  MINIMUM_SLEEP_MINUTES?: number
  RUN_BACKGROUND_TASK?: () => boolean
}

export interface TextileOptions {
  debug?: boolean
}
