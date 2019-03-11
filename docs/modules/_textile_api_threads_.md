[API](../README.md) > ["Textile/API/threads"](../modules/_textile_api_threads_.md)

# External module: "Textile/API/threads"

## Index

### Variables

* [TextileNode](_textile_api_threads_.md#textilenode)

### Functions

* [add](_textile_api_threads_.md#add)
* [addOrUpdate](_textile_api_threads_.md#addorupdate)
* [get](_textile_api_threads_.md#get)
* [list](_textile_api_threads_.md#list)
* [remove](_textile_api_threads_.md#remove)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/threads.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/threads.ts#L5)*

___

## Functions

<a id="add"></a>

###  add

▸ **add**(config: *`IAddThreadConfig`*): `Promise`<`IThread`>

*Defined in [Textile/API/threads.ts:10](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/threads.ts#L10)*

Add a new Thread.

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | `IAddThreadConfig` |

**Returns:** `Promise`<`IThread`>

___
<a id="addorupdate"></a>

###  addOrUpdate

▸ **addOrUpdate**(thread: *`IThread`*): `Promise`<`void`>

*Defined in [Textile/API/threads.ts:19](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/threads.ts#L19)*

Add a Thread or update metadata if new.

**Parameters:**

| Name | Type |
| ------ | ------ |
| thread | `IThread` |

**Returns:** `Promise`<`void`>

___
<a id="get"></a>

###  get

▸ **get**(threadId: *`string`*): `Promise`<`IThread`>

*Defined in [Textile/API/threads.ts:27](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/threads.ts#L27)*

Get Thread details by ThreadId.

**Parameters:**

| Name | Type |
| ------ | ------ |
| threadId | `string` |

**Returns:** `Promise`<`IThread`>

___
<a id="list"></a>

###  list

▸ **list**(): `Promise`<`IThreadList`>

*Defined in [Textile/API/threads.ts:35](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/threads.ts#L35)*

List all Threads.

**Returns:** `Promise`<`IThreadList`>

___
<a id="remove"></a>

###  remove

▸ **remove**(id_: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/threads.ts:43](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/threads.ts#L43)*

Remove a Thread by ThreadId.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___

