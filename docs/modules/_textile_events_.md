[API](../README.md) > ["Textile/events"](../modules/_textile_events_.md)

# External module: "Textile/events"

## Index

### Classes

* [Events](../classes/_textile_events_.events.md)

### Type aliases

* [TextileEvents](_textile_events_.md#textileevents)

### Variables

* [nativeEvents](_textile_events_.md#nativeevents)

### Functions

* [appNextState](_textile_events_.md#appnextstate)
* [appStateChange](_textile_events_.md#appstatechange)
* [backgroundTask](_textile_events_.md#backgroundtask)
* [createAndStartNode](_textile_events_.md#createandstartnode)
* [migrationNeeded](_textile_events_.md#migrationneeded)
* [newError](_textile_events_.md#newerror)
* [newNodeState](_textile_events_.md#newnodestate)
* [nonInitializedError](_textile_events_.md#noninitializederror)
* [setRecoveryPhrase](_textile_events_.md#setrecoveryphrase)
* [startNodeFinished](_textile_events_.md#startnodefinished)
* [stopNodeAfterDelayCancelled](_textile_events_.md#stopnodeafterdelaycancelled)
* [stopNodeAfterDelayComplete](_textile_events_.md#stopnodeafterdelaycomplete)
* [stopNodeAfterDelayFinishing](_textile_events_.md#stopnodeafterdelayfinishing)
* [stopNodeAfterDelayStarting](_textile_events_.md#stopnodeafterdelaystarting)
* [updateProfile](_textile_events_.md#updateprofile)
* [walletInitSuccess](_textile_events_.md#walletinitsuccess)

### Object literals

* [privateEvents](_textile_events_.md#privateevents)
* [publicEvents](_textile_events_.md#publicevents)

---

## Type aliases

<a id="textileevents"></a>

###  TextileEvents

**Ƭ TextileEvents**: *"newNodeState" \| "createAndStartNode" \| "startNodeFinished" \| "stopNodeAfterDelayStarting" \| "stopNodeAfterDelayCancelled" \| "stopNodeAfterDelayFinishing" \| "stopNodeAfterDelayComplete" \| "appStateChange" \| "updateProfile" \| "newErrorMessage" \| "appNextState" \| "migrationNeeded" \| "setRecoveryPhrase" \| "walletInitSuccess" \| "backgroundTask" \| "error" \| "NODE_START" \| "NODE_ONLINE" \| "NODE_STOP" \| "WALLET_UPDATE" \| "THREAD_UPDATE" \| "NOTIFICATION" \| "QUERY_RESPONSE"*

*Defined in [Textile/events.ts:8](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L8)*

___

## Variables

<a id="nativeevents"></a>

### `<Const>` nativeEvents

**● nativeEvents**: *[TextileEvents](_textile_events_.md#textileevents)[]* =  ['NODE_START', 'NODE_ONLINE', 'NODE_STOP', 'WALLET_UPDATE', 'THREAD_UPDATE', 'NOTIFICATION', 'QUERY_RESPONSE']

*Defined in [Textile/events.ts:53](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L53)*

___

## Functions

<a id="appnextstate"></a>

###  appNextState

▸ **appNextState**(nextState: *`string`*): `void`

*Defined in [Textile/events.ts:119](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L119)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| nextState | `string` |

**Returns:** `void`

___
<a id="appstatechange"></a>

###  appStateChange

▸ **appStateChange**(previousState: *[TextileAppStateStatus](_textile_models_sdk_.md#textileappstatestatus)*, newState: *[TextileAppStateStatus](_textile_models_sdk_.md#textileappstatestatus)*): `void`

*Defined in [Textile/events.ts:101](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L101)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| previousState | [TextileAppStateStatus](_textile_models_sdk_.md#textileappstatestatus) |
| newState | [TextileAppStateStatus](_textile_models_sdk_.md#textileappstatestatus) |

**Returns:** `void`

___
<a id="backgroundtask"></a>

###  backgroundTask

▸ **backgroundTask**(): `void`

*Defined in [Textile/events.ts:69](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L69)*

**Returns:** `void`

___
<a id="createandstartnode"></a>

###  createAndStartNode

▸ **createAndStartNode**(): `void`

*Defined in [Textile/events.ts:77](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L77)*

**Returns:** `void`

___
<a id="migrationneeded"></a>

###  migrationNeeded

▸ **migrationNeeded**(): `void`

*Defined in [Textile/events.ts:115](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L115)*

**Returns:** `void`

___
<a id="newerror"></a>

###  newError

▸ **newError**(message: *`string`*, type: *`string`*): `void`

*Defined in [Textile/events.ts:62](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L62)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| type | `string` |

**Returns:** `void`

___
<a id="newnodestate"></a>

###  newNodeState

▸ **newNodeState**(state: *[NodeState](../enums/_textile_models_sdk_.nodestate.md)*): `void`

*Defined in [Textile/events.ts:74](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L74)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [NodeState](../enums/_textile_models_sdk_.nodestate.md) |

**Returns:** `void`

___
<a id="noninitializederror"></a>

###  nonInitializedError

▸ **nonInitializedError**(): `void`

*Defined in [Textile/events.ts:66](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L66)*

**Returns:** `void`

___
<a id="setrecoveryphrase"></a>

###  setRecoveryPhrase

▸ **setRecoveryPhrase**(recoveryPhrase: *`string`*): `void`

*Defined in [Textile/events.ts:112](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L112)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| recoveryPhrase | `string` |

**Returns:** `void`

___
<a id="startnodefinished"></a>

###  startNodeFinished

▸ **startNodeFinished**(): `void`

*Defined in [Textile/events.ts:82](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L82)*

**Returns:** `void`

___
<a id="stopnodeafterdelaycancelled"></a>

###  stopNodeAfterDelayCancelled

▸ **stopNodeAfterDelayCancelled**(): `void`

*Defined in [Textile/events.ts:90](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L90)*

**Returns:** `void`

___
<a id="stopnodeafterdelaycomplete"></a>

###  stopNodeAfterDelayComplete

▸ **stopNodeAfterDelayComplete**(): `void`

*Defined in [Textile/events.ts:98](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L98)*

**Returns:** `void`

___
<a id="stopnodeafterdelayfinishing"></a>

###  stopNodeAfterDelayFinishing

▸ **stopNodeAfterDelayFinishing**(): `void`

*Defined in [Textile/events.ts:94](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L94)*

**Returns:** `void`

___
<a id="stopnodeafterdelaystarting"></a>

###  stopNodeAfterDelayStarting

▸ **stopNodeAfterDelayStarting**(): `void`

*Defined in [Textile/events.ts:86](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L86)*

**Returns:** `void`

___
<a id="updateprofile"></a>

###  updateProfile

▸ **updateProfile**(): `void`

*Defined in [Textile/events.ts:105](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L105)*

**Returns:** `void`

___
<a id="walletinitsuccess"></a>

###  walletInitSuccess

▸ **walletInitSuccess**(): `void`

*Defined in [Textile/events.ts:108](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L108)*

**Returns:** `void`

___

## Object literals

<a id="privateevents"></a>

### `<Const>` privateEvents

**privateEvents**: *`object`*

*Defined in [Textile/events.ts:56](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L56)*

<a id="privateevents.appnextstate-1"></a>

####  appNextState

**● appNextState**: *`string`* = "@textile/internal/appNextState"

*Defined in [Textile/events.ts:59](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L59)*

___
<a id="privateevents.backgroundtask-1"></a>

####  backgroundTask

**● backgroundTask**: *`string`* = "@textile/internal/backgroundTask"

*Defined in [Textile/events.ts:57](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L57)*

___
<a id="privateevents.createandstartnode-1"></a>

####  createAndStartNode

**● createAndStartNode**: *`string`* = "@textile/internal/createAndStartNode"

*Defined in [Textile/events.ts:58](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L58)*

___

___
<a id="publicevents"></a>

### `<Const>` publicEvents

**publicEvents**: *`object`*

*Defined in [Textile/events.ts:26](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L26)*

<a id="publicevents.node_online"></a>

####  NODE_ONLINE

**● NODE_ONLINE**: *`string`* = "NODE_ONLINE"

*Defined in [Textile/events.ts:45](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L45)*

___
<a id="publicevents.node_start"></a>

####  NODE_START

**● NODE_START**: *`string`* = "NODE_START"

*Defined in [Textile/events.ts:44](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L44)*

___
<a id="publicevents.node_stop"></a>

####  NODE_STOP

**● NODE_STOP**: *`string`* = "NODE_STOP"

*Defined in [Textile/events.ts:46](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L46)*

___
<a id="publicevents.notification"></a>

####  NOTIFICATION

**● NOTIFICATION**: *`string`* = "NOTIFICATION"

*Defined in [Textile/events.ts:49](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L49)*

___
<a id="publicevents.query_response"></a>

####  QUERY_RESPONSE

**● QUERY_RESPONSE**: *`string`* = "QUERY_RESPONSE"

*Defined in [Textile/events.ts:50](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L50)*

___
<a id="publicevents.thread_update"></a>

####  THREAD_UPDATE

**● THREAD_UPDATE**: *`string`* = "THREAD_UPDATE"

*Defined in [Textile/events.ts:48](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L48)*

___
<a id="publicevents.wallet_update"></a>

####  WALLET_UPDATE

**● WALLET_UPDATE**: *`string`* = "WALLET_UPDATE"

*Defined in [Textile/events.ts:47](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L47)*

___
<a id="publicevents.appnextstate-2"></a>

####  appNextState

**● appNextState**: *`string`* = "@textile/shared/appNextState"

*Defined in [Textile/events.ts:37](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L37)*

___
<a id="publicevents.appstatechange-1"></a>

####  appStateChange

**● appStateChange**: *`string`* = "@textile/shared/appStateChange"

*Defined in [Textile/events.ts:34](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L34)*

___
<a id="publicevents.backgroundtask-2"></a>

####  backgroundTask

**● backgroundTask**: *`string`* = "@textile/shared/backgroundTask"

*Defined in [Textile/events.ts:41](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L41)*

___
<a id="publicevents.createandstartnode-2"></a>

####  createAndStartNode

**● createAndStartNode**: *`string`* = "@textile/shared/createAndStartNode"

*Defined in [Textile/events.ts:28](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L28)*

___
<a id="publicevents.error"></a>

####  error

**● error**: *`string`* = "@textile/shared/error"

*Defined in [Textile/events.ts:42](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L42)*

___
<a id="publicevents.migrationneeded-1"></a>

####  migrationNeeded

**● migrationNeeded**: *`string`* = "@textile/shared/migrationNeeded"

*Defined in [Textile/events.ts:38](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L38)*

___
<a id="publicevents.newerrormessage"></a>

####  newErrorMessage

**● newErrorMessage**: *`string`* = "@textile/shared/newErrorMessage"

*Defined in [Textile/events.ts:36](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L36)*

___
<a id="publicevents.newnodestate-1"></a>

####  newNodeState

**● newNodeState**: *`string`* = "@textile/shared/newNodeState"

*Defined in [Textile/events.ts:27](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L27)*

___
<a id="publicevents.setrecoveryphrase-1"></a>

####  setRecoveryPhrase

**● setRecoveryPhrase**: *`string`* = "@textile/shared/setRecoveryPhrase"

*Defined in [Textile/events.ts:39](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L39)*

___
<a id="publicevents.startnodefinished-1"></a>

####  startNodeFinished

**● startNodeFinished**: *`string`* = "@textile/shared/startNodeFinished"

*Defined in [Textile/events.ts:29](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L29)*

___
<a id="publicevents.stopnodeafterdelaycancelled-1"></a>

####  stopNodeAfterDelayCancelled

**● stopNodeAfterDelayCancelled**: *`string`* = "@textile/shared/stopNodeAfterDelayCancelled"

*Defined in [Textile/events.ts:31](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L31)*

___
<a id="publicevents.stopnodeafterdelaycomplete-1"></a>

####  stopNodeAfterDelayComplete

**● stopNodeAfterDelayComplete**: *`string`* = "@textile/shared/stopNodeAfterDelayComplete"

*Defined in [Textile/events.ts:33](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L33)*

___
<a id="publicevents.stopnodeafterdelayfinishing-1"></a>

####  stopNodeAfterDelayFinishing

**● stopNodeAfterDelayFinishing**: *`string`* = "@textile/shared/stopNodeAfterDelayFinishing"

*Defined in [Textile/events.ts:32](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L32)*

___
<a id="publicevents.stopnodeafterdelaystarting-1"></a>

####  stopNodeAfterDelayStarting

**● stopNodeAfterDelayStarting**: *`string`* = "@textile/shared/stopNodeAfterDelayStarting"

*Defined in [Textile/events.ts:30](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L30)*

___
<a id="publicevents.updateprofile-1"></a>

####  updateProfile

**● updateProfile**: *`string`* = "@textile/shared/updateProfile"

*Defined in [Textile/events.ts:35](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L35)*

___
<a id="publicevents.walletinitsuccess-1"></a>

####  walletInitSuccess

**● walletInitSuccess**: *`string`* = "@textile/shared/walletInitSuccess"

*Defined in [Textile/events.ts:40](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L40)*

___

___

