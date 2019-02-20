import {
  ContactQuery,
  QueryOptions,
  Directory,
  FileIndex
} from '@textile/go-mobile'
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import { Struct, Value, ListValue } from 'google-protobuf/google/protobuf/struct_pb'

export function convertContactQueryData(data: ContactQuery.AsObject) {
  const query = new ContactQuery()
  query.setId(data.id)
  query.setAddress(data.address)
  query.setUsername(data.username)
  return query
}

export function convertContactQueryOptionsData(data: QueryOptions.AsObject) {
  const options = new QueryOptions()
  options.setExcludeList(data.excludeList)
  options.setFilter(data.filter)
  options.setLimit(data.limit)
  options.setLocal(data.local)
  options.setWait(data.wait)
  return options
}

export function convertDirectoryData(data: Directory.AsObject) {
  const directory = new Directory()
  for (const fileIndexData of data.filesMap) {
    directory.getFilesMap().set(fileIndexData[0], convertFileIndexData(fileIndexData[1]))
  }
  return directory
}

export function convertFileIndexData(data: FileIndex.AsObject) {
  const fileIndex = new FileIndex()
  fileIndex.setAdded(data.added ? convertTimestampData(data.added) : undefined)
  fileIndex.setChecksum(data.checksum)
  fileIndex.setHash(data.hash)
  fileIndex.setKey(data.key)
  fileIndex.setMedia(data.media)
  fileIndex.setMeta(data.meta ? convertStructData(data.meta) : undefined)
  fileIndex.setMill(data.mill)
  fileIndex.setName(data.name)
  fileIndex.setOpts(data.opts)
  fileIndex.setSize(data.size)
  fileIndex.setSource(data.source)
  fileIndex.setTargetsList(data.targetsList)
  return fileIndex
}

export function convertTimestampData(data: Timestamp.AsObject) {
  const timesamp = new Timestamp()
  timesamp.setSeconds(data.seconds)
  timesamp.setNanos(data.nanos)
  return timesamp
}

export function convertStructData(data: Struct.AsObject) {
  const struct = new Struct()
  for (const item of data.fieldsMap) {
    struct.getFieldsMap().set(item[0], convertValueData(item[1]))
  }
  return struct
}

export function convertValueData(data: Value.AsObject) {
  const value = new Value()
  value.setBoolValue(data.boolValue)
  value.setListValue(data.listValue ? convertListValueData(data.listValue) : undefined)
  value.setNullValue(data.nullValue)
  value.setNumberValue(data.numberValue)
  value.setStringValue(data.stringValue)
  value.setStructValue(data.structValue ? convertStructData(data.structValue) : undefined)
  return value
}

export function convertListValueData(data: ListValue.AsObject) {
  const listValue = new ListValue()
  const valuesList = data.valuesList.map((valueData) => convertValueData(valueData))
  listValue.setValuesList(valuesList)
  return listValue
}
