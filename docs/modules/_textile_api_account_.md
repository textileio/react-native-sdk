[API](../README.md) > ["Textile/API/account"](../modules/_textile_api_account_.md)

# External module: "Textile/API/account"

## Index

### Variables

* [TextileNode](_textile_api_account_.md#textilenode)

### Functions

* [address](_textile_api_account_.md#address)
* [cancelFindThreadBackups](_textile_api_account_.md#cancelfindthreadbackups)
* [decrypt](_textile_api_account_.md#decrypt)
* [encrypt](_textile_api_account_.md#encrypt)
* [findThreadBackups](_textile_api_account_.md#findthreadbackups)
* [peers](_textile_api_account_.md#peers)
* [seed](_textile_api_account_.md#seed)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/account.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L5)*

___

## Functions

<a id="address"></a>

###  address

▸ **address**(): `Promise`<`string`>

*Defined in [Textile/API/account.ts:10](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L10)*

Get the account address.

**Returns:** `Promise`<`string`>

___
<a id="cancelfindthreadbackups"></a>

###  cancelFindThreadBackups

▸ **cancelFindThreadBackups**(): `Promise`<`void`>

*Defined in [Textile/API/account.ts:60](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L60)*

Cancel an ongoing Thread backup search.

**Returns:** `Promise`<`void`>

___
<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(input: *`Buffer`*): `Promise`<`Buffer`>

*Defined in [Textile/API/account.ts:34](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L34)*

Decrypt a file previously encrypted with the account address.

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `Buffer` |

**Returns:** `Promise`<`Buffer`>

___
<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(input: *`Buffer`*): `Promise`<`Buffer`>

*Defined in [Textile/API/account.ts:26](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L26)*

Encrypt any file with the account address.

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `Buffer` |

**Returns:** `Promise`<`Buffer`>

___
<a id="findthreadbackups"></a>

###  findThreadBackups

▸ **findThreadBackups**(query: *`IThreadBackupQuery`*, options: *`IQueryOptions`*): `Promise`<`string`>

*Defined in [Textile/API/account.ts:50](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L50)*

Locate all Thread backups.

**Parameters:**

| Name | Type |
| ------ | ------ |
| query | `IThreadBackupQuery` |
| options | `IQueryOptions` |

**Returns:** `Promise`<`string`>

___
<a id="peers"></a>

###  peers

▸ **peers**(): `Promise`<`IContactList`>

*Defined in [Textile/API/account.ts:42](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L42)*

List all Contacts.

**Returns:** `Promise`<`IContactList`>

___
<a id="seed"></a>

###  seed

▸ **seed**(): `Promise`<`string`>

*Defined in [Textile/API/account.ts:18](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/account.ts#L18)*

Get the account seed phrase to display to user.

**Returns:** `Promise`<`string`>

___

