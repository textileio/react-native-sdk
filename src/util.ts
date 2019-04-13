import { google } from './model-public'

/**
 * Converts a protobuf timestamp into a Javascript Date
 *
 * ```typescript
 * utils.timestampToDate(timestamp);
 * ```
 */
export function timestampToDate(timestamp?: google.protobuf.ITimestamp) {
  const milliseconds: number = timestamp ? timestamp.seconds as number * 1e3 + timestamp.nanos / 1e6 : 0
  return new Date(milliseconds)
}
