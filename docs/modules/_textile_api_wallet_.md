[API](../README.md) > ["Textile/API/wallet"](../modules/_textile_api_wallet_.md)

# External module: "Textile/API/wallet"

## Index

### Variables

* [TextileNode](_textile_api_wallet_.md#textilenode)

### Functions

* [accountAt](_textile_api_wallet_.md#accountat)
* [create](_textile_api_wallet_.md#create)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/wallet.ts:5](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/wallet.ts#L5)*

___

## Functions

<a id="accountat"></a>

###  accountAt

▸ **accountAt**(phrase: *`string`*, index: *`number`*, password?: *`undefined` \| `string`*): `Promise`<`IMobileWalletAccount`>

*Defined in [Textile/API/wallet.ts:18](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/wallet.ts#L18)*

Get Account information from Wallet.

**Parameters:**

| Name | Type |
| ------ | ------ |
| phrase | `string` |
| index | `number` |
| `Optional` password | `undefined` \| `string` |

**Returns:** `Promise`<`IMobileWalletAccount`>

___
<a id="create"></a>

###  create

▸ **create**(wordCount: *`number`*): `Promise`<`string`>

*Defined in [Textile/API/wallet.ts:10](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/wallet.ts#L10)*

Create the Textile Wallet. Handled by Textile.nodeCreate.

**Parameters:**

| Name | Type |
| ------ | ------ |
| wordCount | `number` |

**Returns:** `Promise`<`string`>

___

