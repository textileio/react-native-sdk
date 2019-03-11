[API](../README.md) > ["Textile/API/messages"](../modules/_textile_api_messages_.md)

# External module: "Textile/API/messages"

## Index

### Variables

* [TextileNode](_textile_api_messages_.md#textilenode)

### Functions

* [add](_textile_api_messages_.md#add)
* [list](_textile_api_messages_.md#list)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/messages.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/messages.ts#L5)*

___

## Functions

<a id="add"></a>

###  add

▸ **add**(threadId: *`string`*, body: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/messages.ts:10](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/messages.ts#L10)*

Add a new message to a Thread.

**Parameters:**

| Name | Type |
| ------ | ------ |
| threadId | `string` |
| body | `string` |

**Returns:** `Promise`<`string`>

___
<a id="list"></a>

###  list

▸ **list**(offset: *`string`*, limit: *`number`*, threadId?: *`undefined` \| `string`*): `Promise`<`ITextList`>

*Defined in [Textile/API/messages.ts:18](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/messages.ts#L18)*

List all messages or list all messages in a Thread.

**Parameters:**

| Name | Type |
| ------ | ------ |
| offset | `string` |
| limit | `number` |
| `Optional` threadId | `undefined` \| `string` |

**Returns:** `Promise`<`ITextList`>

___

