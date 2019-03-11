[API](../README.md) > ["Textile/API/invites"](../modules/_textile_api_invites_.md)

# External module: "Textile/API/invites"

## Index

### Variables

* [TextileNode](_textile_api_invites_.md#textilenode)

### Functions

* [acceptExternal](_textile_api_invites_.md#acceptexternal)
* [add](_textile_api_invites_.md#add)
* [addExternal](_textile_api_invites_.md#addexternal)
* [remove](_textile_api_invites_.md#remove)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/invites.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/invites.ts#L5)*

___

## Functions

<a id="acceptexternal"></a>

###  acceptExternal

▸ **acceptExternal**(id_: *`string`*, key: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/invites.ts:33](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/invites.ts#L33)*

Accept an external invite.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |
| key | `string` |

**Returns:** `Promise`<`string`>

___
<a id="add"></a>

###  add

▸ **add**(threadId: *`string`*, inviteeId: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/invites.ts:9](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/invites.ts#L9)*

Add a new Thread invite for an invitee.

**Parameters:**

| Name | Type |
| ------ | ------ |
| threadId | `string` |
| inviteeId | `string` |

**Returns:** `Promise`<`string`>

___
<a id="addexternal"></a>

###  addExternal

▸ **addExternal**(threadId: *`string`*): `Promise`<`INewInvite`>

*Defined in [Textile/API/invites.ts:25](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/invites.ts#L25)*

Add an external Thread invite, returning an HTTPS link.

**Parameters:**

| Name | Type |
| ------ | ------ |
| threadId | `string` |

**Returns:** `Promise`<`INewInvite`>

___
<a id="remove"></a>

###  remove

▸ **remove**(id_: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/invites.ts:17](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/invites.ts#L17)*

Remove a Thread invite by ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___

