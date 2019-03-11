[API](../README.md) > ["Textile/index"](../modules/_textile_index_.md) > [Textile](../classes/_textile_index_.textile.md)

# Class: Textile

The Textile Object

*__param__*: 

## Hierarchy

**Textile**

## Index

### Constructors

* [constructor](_textile_index_.textile.md#constructor)

### Methods

* [cafesDiscoverAndRegister](_textile_index_.textile.md#cafesdiscoverandregister)
* [getAppState](_textile_index_.textile.md#getappstate)
* [getCafeSessions](_textile_index_.textile.md#getcafesessions)
* [getInitialized](_textile_index_.textile.md#getinitialized)
* [getNodeOnline](_textile_index_.textile.md#getnodeonline)
* [getNodeState](_textile_index_.textile.md#getnodestate)
* [getRefreshedCafeSessions](_textile_index_.textile.md#getrefreshedcafesessions)
* [nodeCreate](_textile_index_.textile.md#nodecreate)
* [nodeCreateAndStart](_textile_index_.textile.md#nodecreateandstart)
* [nodeStart](_textile_index_.textile.md#nodestart)
* [setup](_textile_index_.textile.md#setup)
* [tearDown](_textile_index_.textile.md#teardown)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Textile**(options: *[TextileOptions](../interfaces/_textile_models_sdk_.textileoptions.md)*): [Textile](_textile_index_.textile.md)

*Defined in [Textile/index.ts:45](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [TextileOptions](../interfaces/_textile_models_sdk_.textileoptions.md) |

**Returns:** [Textile](_textile_index_.textile.md)

___

## Methods

<a id="cafesdiscoverandregister"></a>

###  cafesDiscoverAndRegister

▸ **cafesDiscoverAndRegister**(): `Promise`<`void`>

*Defined in [Textile/index.ts:213](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L213)*

Connect to a remote Cafe. the Cafe config must be provided to Textile.setup to then discover and register. Textile node must have be started.

```typescript
Textile.cafesDiscoverAndRegister();
```

**Returns:** `Promise`<`void`>

___
<a id="getappstate"></a>

###  getAppState

▸ **getAppState**(): `Promise`<[TextileAppStateStatus](../modules/_textile_models_sdk_.md#textileappstatestatus)>

*Defined in [Textile/index.ts:248](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L248)*

Selector to determine if the current AppState (TextileAppStateStatus)

```typescript
const appState = Textile.getAppState();
```

**Returns:** `Promise`<[TextileAppStateStatus](../modules/_textile_models_sdk_.md#textileappstatestatus)>

___
<a id="getcafesessions"></a>

###  getCafeSessions

▸ **getCafeSessions**(): `Promise`<`ReadonlyArray`<`ICafeSession`>>

*Defined in [Textile/index.ts:288](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L288)*

Selector to get the current Cafe Sessions, used for HTTP requests to the Cafe. Should be called after Cafe is registered

```typescript
const cafeSessions = Textile.getCafeSessions();
```

**Returns:** `Promise`<`ReadonlyArray`<`ICafeSession`>>

___
<a id="getinitialized"></a>

###  getInitialized

▸ **getInitialized**(): `boolean`

*Defined in [Textile/index.ts:237](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L237)*

Selector to determine if the Textile class has been initialized.

```typescript
const isInitialized = Textile.getInitialized();
```

**Returns:** `boolean`

___
<a id="getnodeonline"></a>

###  getNodeOnline

▸ **getNodeOnline**(): `Promise`<`boolean`>

*Defined in [Textile/index.ts:260](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L260)*

Selector to determine if the node is online.

```typescript
const nodeOnline = Textile.getNodeOnline();
```

**Returns:** `Promise`<`boolean`>

___
<a id="getnodestate"></a>

###  getNodeState

▸ **getNodeState**(): `Promise`<[NodeState](../enums/_textile_models_sdk_.nodestate.md)>

*Defined in [Textile/index.ts:272](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L272)*

Selector to determine the current Node State (NodeState)

```typescript
const nodeState = Textile.getNodeState();
```

**Returns:** `Promise`<[NodeState](../enums/_textile_models_sdk_.nodestate.md)>

___
<a id="getrefreshedcafesessions"></a>

###  getRefreshedCafeSessions

▸ **getRefreshedCafeSessions**(): `Promise`<`ReadonlyArray`<`ICafeSession`>>

*Defined in [Textile/index.ts:303](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L303)*

Selector to get the refreshed Cafe Sessions. This should only be called if a Cafe rejects a request due to expired an session.

```typescript
Textile.getRefreshedCafeSessions();
```

**Returns:** `Promise`<`ReadonlyArray`<`ICafeSession`>>

___
<a id="nodecreate"></a>

###  nodeCreate

▸ **nodeCreate**(): `Promise`<`void`>

*Defined in [Textile/index.ts:164](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L164)*

Initialize a node, including wallet and data repo. Textile class must have been previously initialized.

```typescript
Textile.nodeCreate();
```

**Returns:** `Promise`<`void`>

___
<a id="nodecreateandstart"></a>

###  nodeCreateAndStart

▸ **nodeCreateAndStart**(): `Promise`<`void`>

*Defined in [Textile/index.ts:112](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L112)*

Create and start the node in one call. This is a combination of Textile.create and Textile.start. The nodeCreateAndStart method will add additional helpers to manage starting the node in any state.

Textile class must have been previously initialized.

```typescript
Textile.nodeCreateAndStart();
```

**Returns:** `Promise`<`void`>

___
<a id="nodestart"></a>

###  nodeStart

▸ **nodeStart**(): `Promise`<`void`>

*Defined in [Textile/index.ts:184](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L184)*

Start a node to connect to the IPFS network, peers, etc. Textile node must have been previously started.

```typescript
Textile.nodeCreate();
```

**Returns:** `Promise`<`void`>

___
<a id="setup"></a>

###  setup

▸ **setup**(config?: *[TextileConfig](../interfaces/_textile_models_sdk_.textileconfig.md)*, cafe?: *[CafeConfig](../interfaces/_textile_models_sdk_.cafeconfig.md)*): `Promise`<`void`>

*Defined in [Textile/index.ts:90](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L90)*

The primary Setup method to call when first loading Textile in your app.

You should call Textile.setup() as early in your app as possible. This is the sole initialized copy of Textile, for all other Textile requests you will use the API or events.

```typescript
import Textile from '@textile/react-native-sdk';
Textile.setup();
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` config | [TextileConfig](../interfaces/_textile_models_sdk_.textileconfig.md) |
| `Optional` cafe | [CafeConfig](../interfaces/_textile_models_sdk_.cafeconfig.md) |

**Returns:** `Promise`<`void`>

___
<a id="teardown"></a>

###  tearDown

▸ **tearDown**(): `void`

*Defined in [Textile/index.ts:65](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/index.ts#L65)*

Cleans up all open event listeners.

Textile.tearDown should be called whenever your app is going to exit memory.

```typescript
Textile.tearDown();
```

**Returns:** `void`

___

