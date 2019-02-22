import { pb } from './'

export function timestampToDate(timestamp?: pb.google.protobuf.ITimestamp) {
  let millis: number
  if (!timestamp) {
    millis = 0
  } else {
    millis = timestamp.seconds as number * 1e3 + timestamp.nanos / 1e6
  }
  return new Date(millis)
}
