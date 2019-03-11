[API](../README.md) > ["Textile/API/profile"](../modules/_textile_api_profile_.md)

# External module: "Textile/API/profile"

## Index

### Variables

* [TextileNode](_textile_api_profile_.md#textilenode)

### Functions

* [avatar](_textile_api_profile_.md#avatar)
* [get](_textile_api_profile_.md#get)
* [setAvatar](_textile_api_profile_.md#setavatar)
* [setUsername](_textile_api_profile_.md#setusername)
* [username](_textile_api_profile_.md#username)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/profile.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/profile.ts#L5)*

___

## Functions

<a id="avatar"></a>

###  avatar

▸ **avatar**(): `Promise`<`string` \| `undefined`>

*Defined in [Textile/API/profile.ts:33](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/profile.ts#L33)*

Get the BlockId of the current user Avatar.

**Returns:** `Promise`<`string` \| `undefined`>

___
<a id="get"></a>

###  get

▸ **get**(): `Promise`<`IContact`>

*Defined in [Textile/API/profile.ts:10](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/profile.ts#L10)*

Get the profile.

**Returns:** `Promise`<`IContact`>

___
<a id="setavatar"></a>

###  setAvatar

▸ **setAvatar**(id_: *`string`*): `Promise`<`void`>

*Defined in [Textile/API/profile.ts:41](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/profile.ts#L41)*

Set a new Avatar by ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`void`>

___
<a id="setusername"></a>

###  setUsername

▸ **setUsername**(username: *`string`*): `Promise`<`void`>

*Defined in [Textile/API/profile.ts:26](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/profile.ts#L26)*

Update the username.

**Parameters:**

| Name | Type |
| ------ | ------ |
| username | `string` |

**Returns:** `Promise`<`void`>

___
<a id="username"></a>

###  username

▸ **username**(): `Promise`<`string` \| `undefined`>

*Defined in [Textile/API/profile.ts:18](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/profile.ts#L18)*

Get the username.

**Returns:** `Promise`<`string` \| `undefined`>

___

