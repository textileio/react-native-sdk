[API](../README.md) > ["Textile/API/cafes"](../modules/_textile_api_cafes_.md)

# External module: "Textile/API/cafes"

## Index

### Variables

* [TextileNode](_textile_api_cafes_.md#textilenode)

### Functions

* [checkMessages](_textile_api_cafes_.md#checkmessages)
* [deregister](_textile_api_cafes_.md#deregister)
* [refreshSession](_textile_api_cafes_.md#refreshsession)
* [register](_textile_api_cafes_.md#register)
* [session](_textile_api_cafes_.md#session)
* [sessions](_textile_api_cafes_.md#sessions)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/cafes.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/cafes.ts#L5)*

___

## Functions

<a id="checkmessages"></a>

###  checkMessages

▸ **checkMessages**(): `Promise`<`void`>

*Defined in [Textile/API/cafes.ts:53](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/cafes.ts#L53)*

Check for offline messages on remote Cafe.

**Returns:** `Promise`<`void`>

___
<a id="deregister"></a>

###  deregister

▸ **deregister**(id: *`string`*): `Promise`<`void`>

*Defined in [Textile/API/cafes.ts:47](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/cafes.ts#L47)*

Deregister a remote Cafe.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Promise`<`void`>

___
<a id="refreshsession"></a>

###  refreshSession

▸ **refreshSession**(peerId: *`string`*): `Promise`<`ICafeSession` \| `undefined`>

*Defined in [Textile/API/cafes.ts:37](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/cafes.ts#L37)*

Refresh an existing session by peerId.

**Parameters:**

| Name | Type |
| ------ | ------ |
| peerId | `string` |

**Returns:** `Promise`<`ICafeSession` \| `undefined`>

___
<a id="register"></a>

###  register

▸ **register**(url: *`string`*, token: *`string`*): `Promise`<`void`>

*Defined in [Textile/API/cafes.ts:10](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/cafes.ts#L10)*

Register a new remote cafe.

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |
| token | `string` |

**Returns:** `Promise`<`void`>

___
<a id="session"></a>

###  session

▸ **session**(peerId: *`string`*): `Promise`<`ICafeSession` \| `undefined`>

*Defined in [Textile/API/cafes.ts:17](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/cafes.ts#L17)*

Initialize a new session.

**Parameters:**

| Name | Type |
| ------ | ------ |
| peerId | `string` |

**Returns:** `Promise`<`ICafeSession` \| `undefined`>

___
<a id="sessions"></a>

###  sessions

▸ **sessions**(): `Promise`<`ICafeSessionList` \| `undefined`>

*Defined in [Textile/API/cafes.ts:27](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/cafes.ts#L27)*

List all sessions.

**Returns:** `Promise`<`ICafeSessionList` \| `undefined`>

___

