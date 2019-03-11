[API](../README.md) > ["Textile/API/contacts"](../modules/_textile_api_contacts_.md)

# External module: "Textile/API/contacts"

## Index

### Variables

* [TextileNode](_textile_api_contacts_.md#textilenode)

### Functions

* [add](_textile_api_contacts_.md#add)
* [cancelSearch](_textile_api_contacts_.md#cancelsearch)
* [get](_textile_api_contacts_.md#get)
* [list](_textile_api_contacts_.md#list)
* [remove](_textile_api_contacts_.md#remove)
* [search](_textile_api_contacts_.md#search)
* [threads](_textile_api_contacts_.md#threads)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/contacts.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L5)*

___

## Functions

<a id="add"></a>

###  add

▸ **add**(contact: *`IContact`*): `Promise`<`void`>

*Defined in [Textile/API/contacts.ts:9](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L9)*

Add a new Contact after fetching the Contact information.

**Parameters:**

| Name | Type |
| ------ | ------ |
| contact | `IContact` |

**Returns:** `Promise`<`void`>

___
<a id="cancelsearch"></a>

###  cancelSearch

▸ **cancelSearch**(): `Promise`<`void`>

*Defined in [Textile/API/contacts.ts:55](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L55)*

Cancel an ongoing contact search.

**Returns:** `Promise`<`void`>

___
<a id="get"></a>

###  get

▸ **get**(id_: *`string`*): `Promise`<`IContact` \| `undefined`>

*Defined in [Textile/API/contacts.ts:16](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L16)*

Get Contact information by ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`IContact` \| `undefined`>

___
<a id="list"></a>

###  list

▸ **list**(): `Promise`<`IContactList`>

*Defined in [Textile/API/contacts.ts:26](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L26)*

List all known Contacts.

**Returns:** `Promise`<`IContactList`>

___
<a id="remove"></a>

###  remove

▸ **remove**(id_: *`string`*): `Promise`<`void`>

*Defined in [Textile/API/contacts.ts:33](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L33)*

Remove a Contact by their ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`void`>

___
<a id="search"></a>

###  search

▸ **search**(query: *`IContactQuery`*, options: *`IQueryOptions`*): `Promise`<`string`>

*Defined in [Textile/API/contacts.ts:46](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L46)*

Search for Contacts over network.

**Parameters:**

| Name | Type |
| ------ | ------ |
| query | `IContactQuery` |
| options | `IQueryOptions` |

**Returns:** `Promise`<`string`>

___
<a id="threads"></a>

###  threads

▸ **threads**(id_: *`string`*): `Promise`<`IThreadList`>

*Defined in [Textile/API/contacts.ts:39](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/contacts.ts#L39)*

List all Threads in common with a Contact.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`IThreadList`>

___

