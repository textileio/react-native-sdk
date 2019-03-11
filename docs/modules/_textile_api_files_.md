[API](../README.md) > ["Textile/API/files"](../modules/_textile_api_files_.md)

# External module: "Textile/API/files"

## Index

### Variables

* [TextileNode](_textile_api_files_.md#textilenode)

### Functions

* [add](_textile_api_files_.md#add)
* [addByTarget](_textile_api_files_.md#addbytarget)
* [data](_textile_api_files_.md#data)
* [imageDataForMinWidth](_textile_api_files_.md#imagedataforminwidth)
* [list](_textile_api_files_.md#list)
* [prepare](_textile_api_files_.md#prepare)
* [prepareAsync](_textile_api_files_.md#prepareasync)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/files.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L5)*

___

## Functions

<a id="add"></a>

###  add

▸ **add**(dir: *`IDirectory`*, threadId: *`string`*, caption?: *`undefined` \| `string`*): `Promise`<`IBlock`>

*Defined in [Textile/API/files.ts:23](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L23)*

Add a file object to a Thread. Must match Thread schema definition.

**Parameters:**

| Name | Type |
| ------ | ------ |
| dir | `IDirectory` |
| threadId | `string` |
| `Optional` caption | `undefined` \| `string` |

**Returns:** `Promise`<`IBlock`>

___
<a id="addbytarget"></a>

###  addByTarget

▸ **addByTarget**(target: *`string`*, threadId: *`string`*, caption?: *`undefined` \| `string`*): `Promise`<`IBlock`>

*Defined in [Textile/API/files.ts:31](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L31)*

Add a file by target.

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `string` |
| threadId | `string` |
| `Optional` caption | `undefined` \| `string` |

**Returns:** `Promise`<`IBlock`>

___
<a id="data"></a>

###  data

▸ **data**(hash: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/files.ts:45](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L45)*

Get the raw data for a file at an IPFS hash.

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |

**Returns:** `Promise`<`string`>

___
<a id="imagedataforminwidth"></a>

###  imageDataForMinWidth

▸ **imageDataForMinWidth**(pth: *`string`*, minWidth: *`number`*): `Promise`<`string`>

*Defined in [Textile/API/files.ts:54](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L54)*

Get the best size image from a Thread with MEDIA type thread given a minimum width.

Note: pth is /, e.g., "Qm.../0"

**Parameters:**

| Name | Type |
| ------ | ------ |
| pth | `string` |
| minWidth | `number` |

**Returns:** `Promise`<`string`>

___
<a id="list"></a>

###  list

▸ **list**(offset: *`string`*, limit: *`number`*, threadId?: *`undefined` \| `string`*): `Promise`<`IFilesList`>

*Defined in [Textile/API/files.ts:38](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L38)*

List all files or files in a known Thread.

**Parameters:**

| Name | Type |
| ------ | ------ |
| offset | `string` |
| limit | `number` |
| `Optional` threadId | `undefined` \| `string` |

**Returns:** `Promise`<`IFilesList`>

___
<a id="prepare"></a>

###  prepare

▸ **prepare**(path: *`string`*, threadId: *`string`*): `Promise`<`IMobilePreparedFiles`>

*Defined in [Textile/API/files.ts:9](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L9)*

Use a Thread's Mill to prepare a raw file for adding to a Thread.

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |
| threadId | `string` |

**Returns:** `Promise`<`IMobilePreparedFiles`>

___
<a id="prepareasync"></a>

###  prepareAsync

▸ **prepareAsync**(path: *`string`*, threadId: *`string`*): `Promise`<`IMobilePreparedFiles`>

*Defined in [Textile/API/files.ts:16](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/files.ts#L16)*

prepare by async

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |
| threadId | `string` |

**Returns:** `Promise`<`IMobilePreparedFiles`>

___

