[API](../README.md) > ["Textile/events"](../modules/_textile_events_.md) > [Events](../classes/_textile_events_.events.md)

# Class: Events

## Hierarchy

**Events**

## Index

### Properties

* [subscriptions](_textile_events_.events.md#subscriptions)

### Methods

* [addListener](_textile_events_.events.md#addlistener)
* [removeAllListeners](_textile_events_.events.md#removealllisteners)
* [removeListener](_textile_events_.events.md#removelistener)

---

## Properties

<a id="subscriptions"></a>

###  subscriptions

**● subscriptions**: *`EmitterSubscription`[]* =  []

*Defined in [Textile/events.ts:126](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L126)*

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(type: *[TextileEvents](../modules/_textile_events_.md#textileevents)*, listener: *`function`*, context?: *`any`*): `EmitterSubscription`

*Defined in [Textile/events.ts:142](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L142)*

Subscribe to any TextileEvent

Events listeners can be added anywhere in your app, as long as the primary Textile.setup step is run somewhere too.

```typescript
import { Events } from '@textile/react-native-sdk';

const textileEvents = Events()
textileEvents.addListener('newNodeState', function(payload) {
   // Handle new node state.
});
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [TextileEvents](../modules/_textile_events_.md#textileevents) |
| listener | `function` |
| `Optional` context | `any` |

**Returns:** `EmitterSubscription`

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(): `void`

*Defined in [Textile/events.ts:176](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L176)*

Remove all listeners

**Returns:** `void`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(type: *[TextileEvents](../modules/_textile_events_.md#textileevents)*, listener: *`function`*): `void`

*Defined in [Textile/events.ts:161](https://github.com/textileio/react-native-sdk/blob/912c704/lib/Textile/events.ts#L161)*

Remove any existing listener.

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [TextileEvents](../modules/_textile_events_.md#textileevents) |
| listener | `function` |

**Returns:** `void`

___

