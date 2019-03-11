[API](../README.md) > ["Textile/API/index"](../modules/_textile_api_index_.md)

# External module: "Textile/API/index"

## Index

### Variables

* [TextileNode](_textile_api_index_.md#textilenode)

### Functions

* [create](_textile_api_index_.md#create)
* [gitSummary](_textile_api_index_.md#gitsummary)
* [init](_textile_api_index_.md#init)
* [migrate](_textile_api_index_.md#migrate)
* [start](_textile_api_index_.md#start)
* [stop](_textile_api_index_.md#stop)
* [summary](_textile_api_index_.md#summary)
* [version](_textile_api_index_.md#version)

---

## Variables

<a id="textilenode"></a>

###  TextileNode

**● TextileNode**: *`any`*

*Defined in [Textile/API/index.ts:24](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L24)*

___

## Functions

<a id="create"></a>

###  create

▸ **create**(repoPath: *`string`*, debug: *`boolean`*): `Promise`<`void`>

*Defined in [Textile/API/index.ts:36](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L36)*

Create the repo node. Handled by Textile.nodeCreate.

**Parameters:**

| Name | Type |
| ------ | ------ |
| repoPath | `string` |
| debug | `boolean` |

**Returns:** `Promise`<`void`>

___
<a id="gitsummary"></a>

###  gitSummary

▸ **gitSummary**(): `Promise`<`string`>

*Defined in [Textile/API/index.ts:59](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L59)*

**Returns:** `Promise`<`string`>

___
<a id="init"></a>

###  init

▸ **init**(seed: *`string`*, repoPath: *`string`*, logToDisk: *`boolean`*, debug: *`boolean`*): `Promise`<`void`>

*Defined in [Textile/API/index.ts:26](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seed | `string` |
| repoPath | `string` |
| logToDisk | `boolean` |
| debug | `boolean` |

**Returns:** `Promise`<`void`>

___
<a id="migrate"></a>

###  migrate

▸ **migrate**(repoPath: *`string`*): `Promise`<`void`>

*Defined in [Textile/API/index.ts:30](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| repoPath | `string` |

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Defined in [Textile/API/index.ts:42](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L42)*

Start the Textile Node. Handled by Textile.nodeStart.

**Returns:** `Promise`<`void`>

___
<a id="stop"></a>

###  stop

▸ **stop**(): `Promise`<`void`>

*Defined in [Textile/API/index.ts:48](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L48)*

Stop the Textile Node.

**Returns:** `Promise`<`void`>

___
<a id="summary"></a>

###  summary

▸ **summary**(): `Promise`<`ISummary`>

*Defined in [Textile/API/index.ts:64](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L64)*

**Returns:** `Promise`<`ISummary`>

___
<a id="version"></a>

###  version

▸ **version**(): `Promise`<`string`>

*Defined in [Textile/API/index.ts:54](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/API/index.ts#L54)*

Get the Textile node version

**Returns:** `Promise`<`string`>

___

