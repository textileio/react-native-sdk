[API](../README.md) > ["Textile/API/notifications"](../modules/_textile_api_notifications_.md)

# External module: "Textile/API/notifications"

## Index

### Variables

* [TextileNode](_textile_api_notifications_.md#textilenode)

### Functions

* [acceptInvite](_textile_api_notifications_.md#acceptinvite)
* [countUnread](_textile_api_notifications_.md#countunread)
* [ignoreInvite](_textile_api_notifications_.md#ignoreinvite)
* [list](_textile_api_notifications_.md#list)
* [read](_textile_api_notifications_.md#read)
* [readAll](_textile_api_notifications_.md#readall)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/notifications.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/notifications.ts#L5)*

___

## Functions

<a id="acceptinvite"></a>

###  acceptInvite

▸ **acceptInvite**(id_: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/notifications.ts:41](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/notifications.ts#L41)*

Accept an Invite included in a Notification.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___
<a id="countunread"></a>

###  countUnread

▸ **countUnread**(): `Promise`<`number`>

*Defined in [Textile/API/notifications.ts:19](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/notifications.ts#L19)*

Get count of unread Notifications.

**Returns:** `Promise`<`number`>

___
<a id="ignoreinvite"></a>

###  ignoreInvite

▸ **ignoreInvite**(id_: *`string`*): `Promise`<`string`>

*Defined in [Textile/API/notifications.ts:49](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/notifications.ts#L49)*

Ignore an Invite included in a Notification.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___
<a id="list"></a>

###  list

▸ **list**(offset: *`string`*, limit: *`number`*): `Promise`<`INotificationList`>

*Defined in [Textile/API/notifications.ts:11](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/notifications.ts#L11)*

List all Notifications.

**Parameters:**

| Name | Type |
| ------ | ------ |
| offset | `string` |
| limit | `number` |

**Returns:** `Promise`<`INotificationList`>

___
<a id="read"></a>

###  read

▸ **read**(id_: *`string`*): `Promise`<`void`>

*Defined in [Textile/API/notifications.ts:27](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/notifications.ts#L27)*

Mark a Notification as read by ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`void`>

___
<a id="readall"></a>

###  readAll

▸ **readAll**(): `Promise`<`void`>

*Defined in [Textile/API/notifications.ts:34](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/notifications.ts#L34)*

Mark all Notifications as read.

**Returns:** `Promise`<`void`>

___

