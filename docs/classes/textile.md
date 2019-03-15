[@textile/react-native-sdk](../README.md) > [Textile](../classes/textile.md)

# Class: Textile

The Textile Object

*__param__*: 

## Hierarchy

**Textile**

## Index

### Constructors

* [constructor](textile.md#constructor)

### Properties

* [node_version](textile.md#node_version)

### Methods

* [cafesDiscoverAndRegister](textile.md#cafesdiscoverandregister)
* [getAppState](textile.md#getappstate)
* [getCafeSessions](textile.md#getcafesessions)
* [getInitialized](textile.md#getinitialized)
* [getNodeOnline](textile.md#getnodeonline)
* [getNodeState](textile.md#getnodestate)
* [getRefreshedCafeSessions](textile.md#getrefreshedcafesessions)
* [nodeCreate](textile.md#nodecreate)
* [nodeCreateAndStart](textile.md#nodecreateandstart)
* [nodeStart](textile.md#nodestart)
* [setup](textile.md#setup)
* [tearDown](textile.md#teardown)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Textile**(options: *`TextileOptions`*): [Textile](textile.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `TextileOptions` |

**Returns:** [Textile](textile.md)

___

## Properties

<a id="node_version"></a>

###  node_version

**● node_version**: *`string`* =  VERSION

Get the current version of `go-textile` running in the SDK.

```typescript
Textile.node_version;
```

___

## Methods

<a id="cafesdiscoverandregister"></a>

###  cafesDiscoverAndRegister

▸ **cafesDiscoverAndRegister**(): `Promise`<`void`>

Connect to a remote Cafe. the Cafe config must be provided to Textile.setup to then discover and register. Textile node must have be started.

```typescript
Textile.cafesDiscoverAndRegister();
```

**Returns:** `Promise`<`void`>

___
<a id="getappstate"></a>

###  getAppState

▸ **getAppState**(): `Promise`<`TextileAppStateStatus`>

Selector to determine if the current AppState (TextileAppStateStatus)

```typescript
const appState = Textile.getAppState();
```

**Returns:** `Promise`<`TextileAppStateStatus`>

___
<a id="getcafesessions"></a>

###  getCafeSessions

▸ **getCafeSessions**(): `Promise`<`ReadonlyArray`<`ICafeSession`>>

Selector to get the current Cafe Sessions, used for HTTP requests to the Cafe. Should be called after Cafe is registered

```typescript
const cafeSessions = Textile.getCafeSessions();
```

**Returns:** `Promise`<`ReadonlyArray`<`ICafeSession`>>

___
<a id="getinitialized"></a>

###  getInitialized

▸ **getInitialized**(): `boolean`

Selector to determine if the Textile class has been initialized.

```typescript
const isInitialized = Textile.getInitialized();
```

**Returns:** `boolean`

___
<a id="getnodeonline"></a>

###  getNodeOnline

▸ **getNodeOnline**(): `Promise`<`boolean`>

Selector to determine if the node is online.

```typescript
const nodeOnline = Textile.getNodeOnline();
```

**Returns:** `Promise`<`boolean`>

___
<a id="getnodestate"></a>

###  getNodeState

▸ **getNodeState**(): `Promise`<`NodeState`>

Selector to determine the current Node State (NodeState)

```typescript
const nodeState = Textile.getNodeState();
```

**Returns:** `Promise`<`NodeState`>

___
<a id="getrefreshedcafesessions"></a>

###  getRefreshedCafeSessions

▸ **getRefreshedCafeSessions**(): `Promise`<`ReadonlyArray`<`ICafeSession`>>

Selector to get the refreshed Cafe Sessions. This should only be called if a Cafe rejects a request due to expired an session.

```typescript
Textile.getRefreshedCafeSessions();
```

**Returns:** `Promise`<`ReadonlyArray`<`ICafeSession`>>

___
<a id="nodecreate"></a>

###  nodeCreate

▸ **nodeCreate**(): `Promise`<`void`>

Initialize a node, including wallet and data repo. Textile class must have been previously initialized.

```typescript
Textile.nodeCreate();
```

**Returns:** `Promise`<`void`>

___
<a id="nodecreateandstart"></a>

###  nodeCreateAndStart

▸ **nodeCreateAndStart**(): `Promise`<`void`>

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

Start a node to connect to the IPFS network, peers, etc. Textile node must have been previously started.

```typescript
Textile.nodeCreate();
```

**Returns:** `Promise`<`void`>

___
<a id="setup"></a>

###  setup

▸ **setup**(config?: *`TextileConfig`*, cafe?: *`CafeConfig`*): `Promise`<`void`>

The primary Setup method to call when first loading Textile in your app.

You should call Textile.setup() as early in your app as possible. This is the sole initialized copy of Textile, for all other Textile requests you will use the API or events.

```typescript
import Textile from '@textile/react-native-sdk';
Textile.setup();
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` config | `TextileConfig` |
| `Optional` cafe | `CafeConfig` |

**Returns:** `Promise`<`void`>

___
<a id="teardown"></a>

###  tearDown

▸ **tearDown**(): `void`

Cleans up all open event listeners.

Textile.tearDown should be called whenever your app is going to exit memory.

```typescript
Textile.tearDown();
```

**Returns:** `void`

___

