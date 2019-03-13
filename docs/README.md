
React Native Docs
=================

Installation
------------

`npm install @textile/react-native-sdk --save`

**Link the Framework**

`react-native link @textile/react-native-sdk`

**Update Search Paths in iOS**

The library requires you to update two Search Paths in your iOS code to locate Textile's mobile framework (installed as a dependency of the React Native library).

Open your project's XCode file. Then, in XCode, navigate to the `Root file -> Build Settings` in the search bar enter, `Search Paths`. You'll see a group of three entries, we are going to edit two.

1.  In `Framework search paths` add `$(SRCROOT)/../node_modules/@textile/go-mobile/dist/ios`
2.  In `Library search paths` add `$(SRCROOT)/../node_modules/@textile/go-mobile/dist/ios`

**Update Android Gradle**

Open your project and navigate to `android/settings.gradle`. At the end, you will add,

```
include ':mobile'
```

Navigate to `app/build.gradle`. Add to the end of the `dependencies {` section,

```
api project(':mobile')
```

Finally, inside the `android` folder, you need to create a new folder called, `mobile`.

Inside the newly created `mobile` folder, create a file called, `build.gradle` and for the contents of `build.gradle` enter,

```
configurations.maybeCreate("default")
artifacts.add("default", file('../../node_modules/@textile/go-mobile/dist/android/mobile.aar'))
```

**Other dependencies**

The Textile library also requires that your project has two other libraries installed. Following the installation instructions for the following two,

1.  [react-native-background-fetch](https://github.com/transistorsoft/react-native-background-fetch)
2.  [react-native-background-timer](https://github.com/ocetnik/react-native-background-timer)

### Typescript Types

@textile/react-native-sdk is written in TypeScript and compiled to JavaScript. You can use either in your app.

#### Import Model Types

Most model types are in the `pb` (protobuf) models module. You can use it the types as follows.

```javascript
import { API, pb } from '@textile/react-native-sdk';

// List all Threads
const threads: pb.ThreadList = yield call(API.threads.list);
```

Examples
--------

### React Native Boilerplate

To jump right into a working app, see our demo [IPFS boilerplate app](https://github.com/textileio/react-native-boilerplate).

### Advanced Boilerplate

We also have a more advanced boilerplate that contains `react-navigation`, redux, and sagas together with Textile. Find that here, [advanced-react-native-boilerplate](https://github.com/textileio/advanced-react-native-boilerplate/tree/master).

Run Textile
-----------

A few of the Textile methods require access to a single instance with stored state. This instance can be wired into your app in one single place and then communicated with over Events. The minimum requirement to wire Textile into your app are:

### Setup & Teardown

```javascript
import Textile from '@textile/react-native-sdk';

export default class App extends Component<Props> {
  textile = Textile;

  componentDidMount() {
    this.textile.setup();
  }

  componentWillUnMount() {
    this.textile.tearDown();
  }

  render() {
    return (
      <View>
        <Text>Textile</Text>
      </View>
    )
  }
}
```

### Listen to Events

Textile will send a number of events that your app can monitor in order to show information or change interfaces.

#### New Node State

You can monitor startup and shutdown events for the node.

```javascript
this.events.addListener('newNodeState', (payload) => {
  console.log('New node state:' payload.state)
})
```

#### Node Online

Here is an example for listening for the Textile node to come online.

```javascript
this.events.addListener('NODE_ONLINE', () => {
  console.info('Textile node now online');
})
```

### Optional Features

#### Trigger background updates

The node is designed to gracefully disconnect and wind-down tasks when the user backgrounds the containing app. However, some apps may choose to spin the node up in the background in order to sync data or discover new updates. The react-native library will attempt to fire these events on it's own when your app gets background time, however, the react-native detection of these events hasn't been 100%. Additionally, it is helpful if your app fires events based of native background & location event triggers.

You can do this in a background fetch triggered background event

```javascript
  import Textile from '@textile/react-native-sdk';

  ...
  setup () {
    BackgroundFetch.configure({}, () => {
      Textile.backgroundFetch();
    }, (error) => {})
  }
```

Or yu can do this in a location triggered background event

```javascript
  import Textile from '@textile/react-native-sdk';

  ...
  handleNewPosition () {
    Textile.locationUpdate();
  }
```

`backgroundFetch` and `locationUpdate` are stateless APIs and can be run anywhere in your app without having to reference your initialized node.

### Use the Textil API

The API doesn't require an initialized Textile object and can be used anywhere in your code as long as Textile was previously initialized and is running.

#### Import the API

```javascript
import { API } from '@textile/react-native-sdk';
```

#### Make an API request

```javascript
API.data('QmTgtbb4LckHaXh1YhpNcBu48cFY8zgT1Lh49q7q7ksf3M');
```

## Index

### Type aliases

* [TextileEvents](#textileevents)

### Functions

* [BackgroundTask](#backgroundtask)
* [acceptExternal](#acceptexternal)
* [acceptInvite](#acceptinvite)
* [accountAt](#accountat)
* [add](#add)
* [addByTarget](#addbytarget)
* [addExternal](#addexternal)
* [addOrUpdate](#addorupdate)
* [address](#address)
* [appNextState](#appnextstate)
* [appStateChange](#appstatechange)
* [avatar](#avatar)
* [backgroundTask](#backgroundtask)
* [cancelFindThreadBackups](#cancelfindthreadbackups)
* [cancelSearch](#cancelsearch)
* [checkMessages](#checkmessages)
* [countUnread](#countunread)
* [create](#create)
* [createAndStartNode](#createandstartnode)
* [data](#data)
* [dataAtPath](#dataatpath)
* [decrypt](#decrypt)
* [deregister](#deregister)
* [encrypt](#encrypt)
* [findThreadBackups](#findthreadbackups)
* [get](#get)
* [gitSummary](#gitsummary)
* [ignoreInvite](#ignoreinvite)
* [imageDataForMinWidth](#imagedataforminwidth)
* [init](#init)
* [list](#list)
* [migrate](#migrate)
* [migrationNeeded](#migrationneeded)
* [newError](#newerror)
* [newNodeState](#newnodestate)
* [nonInitializedError](#noninitializederror)
* [peerId](#peerid)
* [peers](#peers)
* [prepare](#prepare)
* [prepareAsync](#prepareasync)
* [read](#read)
* [readAll](#readall)
* [refreshSession](#refreshsession)
* [register](#register)
* [remove](#remove)
* [renameThread](#renamethread)
* [search](#search)
* [seed](#seed)
* [session](#session)
* [sessions](#sessions)
* [setAvatar](#setavatar)
* [setLevel](#setlevel)
* [setRecoveryPhrase](#setrecoveryphrase)
* [setUsername](#setusername)
* [start](#start)
* [startNodeFinished](#startnodefinished)
* [stop](#stop)
* [stopNodeAfterDelayCancelled](#stopnodeafterdelaycancelled)
* [stopNodeAfterDelayComplete](#stopnodeafterdelaycomplete)
* [stopNodeAfterDelayFinishing](#stopnodeafterdelayfinishing)
* [stopNodeAfterDelayStarting](#stopnodeafterdelaystarting)
* [summary](#summary)
* [threads](#threads)
* [updateProfile](#updateprofile)
* [username](#username)
* [version](#version)
* [walletInitSuccess](#walletinitsuccess)

### Object literals

* [privateEvents](#privateevents)
* [publicEvents](#publicevents)

---

## Type aliases

<a id="textileevents"></a>

###  TextileEvents

**Ƭ TextileEvents**: *"newNodeState" \| "createAndStartNode" \| "startNodeFinished" \| "stopNodeAfterDelayStarting" \| "stopNodeAfterDelayCancelled" \| "stopNodeAfterDelayFinishing" \| "stopNodeAfterDelayComplete" \| "appStateChange" \| "updateProfile" \| "newErrorMessage" \| "appNextState" \| "migrationNeeded" \| "setRecoveryPhrase" \| "walletInitSuccess" \| "backgroundTask" \| "error" \| "NODE_START" \| "NODE_ONLINE" \| "NODE_STOP" \| "WALLET_UPDATE" \| "THREAD_UPDATE" \| "NOTIFICATION" \| "QUERY_RESPONSE"*

*Defined in [events.ts:8](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L8)*

___

## Functions

<a id="backgroundtask"></a>

###  BackgroundTask

▸ **BackgroundTask**(): `void`

*Defined in [events.ts:64](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L64)*

Notify Textile at the start of a new background sessions.

```typescript
import { BackgroundTask } from '@textile/react-native-sdk';

BackgroundTask();
```

**Returns:** `void`

___
<a id="acceptexternal"></a>

###  acceptExternal

▸ **acceptExternal**(id_: *`string`*, key: *`string`*): `Promise`<`string`>

*Defined in [API/invites.ts:25](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/invites.ts#L25)*

Accept an external invite.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |
| key | `string` |

**Returns:** `Promise`<`string`>

___
<a id="acceptinvite"></a>

###  acceptInvite

▸ **acceptInvite**(id_: *`string`*): `Promise`<`string`>

*Defined in [API/notifications.ts:40](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/notifications.ts#L40)*

Accept an Invite included in a Notification.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___
<a id="accountat"></a>

###  accountAt

▸ **accountAt**(phrase: *`string`*, index: *`number`*, password?: *`undefined` \| `string`*): `Promise`<`IMobileWalletAccount`>

*Defined in [API/wallet.ts:18](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/wallet.ts#L18)*

Get Account information from Wallet.

**Parameters:**

| Name | Type |
| ------ | ------ |
| phrase | `string` |
| index | `number` |
| `Optional` password | `undefined` \| `string` |

**Returns:** `Promise`<`IMobileWalletAccount`>

___
<a id="add"></a>

###  add

▸ **add**(blockId: *`string`*, body: *`string`*): `Promise`<`string`>

*Defined in [API/comments.ts:8](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/comments.ts#L8)*

Add a new comment to a Thread by blockId.

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockId | `string` |
| body | `string` |

**Returns:** `Promise`<`string`>

___
<a id="addbytarget"></a>

###  addByTarget

▸ **addByTarget**(target: *`string`*, threadId: *`string`*, caption?: *`undefined` \| `string`*): `Promise`<`IBlock`>

*Defined in [API/files.ts:31](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/files.ts#L31)*

Add a file by target.

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `string` |
| threadId | `string` |
| `Optional` caption | `undefined` \| `string` |

**Returns:** `Promise`<`IBlock`>

___
<a id="addexternal"></a>

###  addExternal

▸ **addExternal**(threadId: *`string`*): `Promise`<`INewInvite`>

*Defined in [API/invites.ts:17](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/invites.ts#L17)*

Add an external Thread invite, returning an HTTPS link.

**Parameters:**

| Name | Type |
| ------ | ------ |
| threadId | `string` |

**Returns:** `Promise`<`INewInvite`>

___
<a id="addorupdate"></a>

###  addOrUpdate

▸ **addOrUpdate**(thread: *`IThread`*): `Promise`<`void`>

*Defined in [API/threads.ts:19](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/threads.ts#L19)*

Add a Thread or update metadata if new.

**Parameters:**

| Name | Type |
| ------ | ------ |
| thread | `IThread` |

**Returns:** `Promise`<`void`>

___
<a id="address"></a>

###  address

▸ **address**(): `Promise`<`string`>

*Defined in [API/account.ts:10](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/account.ts#L10)*

Get the account address.

**Returns:** `Promise`<`string`>

___
<a id="appnextstate"></a>

###  appNextState

▸ **appNextState**(nextState: *`string`*): `void`

*Defined in [internalEvents.ts:78](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| nextState | `string` |

**Returns:** `void`

___
<a id="appstatechange"></a>

###  appStateChange

▸ **appStateChange**(previousState: *`TextileAppStateStatus`*, newState: *`TextileAppStateStatus`*): `void`

*Defined in [internalEvents.ts:58](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L58)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| previousState | `TextileAppStateStatus` |
| newState | `TextileAppStateStatus` |

**Returns:** `void`

___
<a id="avatar"></a>

###  avatar

▸ **avatar**(): `Promise`<`string` \| `undefined`>

*Defined in [API/profile.ts:33](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/profile.ts#L33)*

Get the BlockId of the current user Avatar.

**Returns:** `Promise`<`string` \| `undefined`>

___
<a id="backgroundtask"></a>

###  backgroundTask

▸ **backgroundTask**(): `void`

*Defined in [internalEvents.ts:24](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L24)*

**Returns:** `void`

___
<a id="cancelfindthreadbackups"></a>

###  cancelFindThreadBackups

▸ **cancelFindThreadBackups**(): `Promise`<`void`>

*Defined in [API/account.ts:60](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/account.ts#L60)*

Cancel an ongoing Thread backup search.

**Returns:** `Promise`<`void`>

___
<a id="cancelsearch"></a>

###  cancelSearch

▸ **cancelSearch**(): `Promise`<`void`>

*Defined in [API/contacts.ts:55](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/contacts.ts#L55)*

Cancel an ongoing contact search.

**Returns:** `Promise`<`void`>

___
<a id="checkmessages"></a>

###  checkMessages

▸ **checkMessages**(): `Promise`<`void`>

*Defined in [API/cafes.ts:53](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/cafes.ts#L53)*

Check for offline messages on remote Cafe.

**Returns:** `Promise`<`void`>

___
<a id="countunread"></a>

###  countUnread

▸ **countUnread**(): `Promise`<`number`>

*Defined in [API/notifications.ts:18](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/notifications.ts#L18)*

Get count of unread Notifications.

**Returns:** `Promise`<`number`>

___
<a id="create"></a>

###  create

▸ **create**(wordCount: *`number`*): `Promise`<`string`>

*Defined in [API/wallet.ts:10](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/wallet.ts#L10)*

Create the Textile Wallet. Handled by Textile.nodeCreate.

**Parameters:**

| Name | Type |
| ------ | ------ |
| wordCount | `number` |

**Returns:** `Promise`<`string`>

___
<a id="createandstartnode"></a>

###  createAndStartNode

▸ **createAndStartNode**(): `void`

*Defined in [internalEvents.ts:33](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L33)*

**Returns:** `void`

___
<a id="data"></a>

###  data

▸ **data**(hash: *`string`*): `Promise`<`string`>

*Defined in [API/files.ts:45](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/files.ts#L45)*

Get the raw data for a file at an IPFS hash.

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |

**Returns:** `Promise`<`string`>

___
<a id="dataatpath"></a>

###  dataAtPath

▸ **dataAtPath**(path: *`string`*): `Promise`<`string`>

*Defined in [API/ipfs.ts:8](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/ipfs.ts#L8)*

Get raw file data by IPFS path. See `cat` method in IPFS.

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |

**Returns:** `Promise`<`string`>

___
<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(input: *`Buffer`*): `Promise`<`Buffer`>

*Defined in [API/account.ts:34](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/account.ts#L34)*

Decrypt a file previously encrypted with the account address.

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `Buffer` |

**Returns:** `Promise`<`Buffer`>

___
<a id="deregister"></a>

###  deregister

▸ **deregister**(id: *`string`*): `Promise`<`void`>

*Defined in [API/cafes.ts:47](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/cafes.ts#L47)*

Deregister a remote Cafe.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Promise`<`void`>

___
<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(input: *`Buffer`*): `Promise`<`Buffer`>

*Defined in [API/account.ts:26](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/account.ts#L26)*

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

*Defined in [API/account.ts:50](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/account.ts#L50)*

Locate all Thread backups.

**Parameters:**

| Name | Type |
| ------ | ------ |
| query | `IThreadBackupQuery` |
| options | `IQueryOptions` |

**Returns:** `Promise`<`string`>

___
<a id="get"></a>

###  get

▸ **get**(id_: *`string`*): `Promise`<`IContact` \| `undefined`>

*Defined in [API/contacts.ts:16](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/contacts.ts#L16)*

Get Contact information by ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`IContact` \| `undefined`>

___
<a id="gitsummary"></a>

###  gitSummary

▸ **gitSummary**(): `Promise`<`string`>

*Defined in [API/index.ts:65](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/index.ts#L65)*

Get the latest git summary

**Returns:** `Promise`<`string`>

___
<a id="ignoreinvite"></a>

###  ignoreInvite

▸ **ignoreInvite**(id_: *`string`*): `Promise`<`string`>

*Defined in [API/notifications.ts:48](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/notifications.ts#L48)*

Ignore an Invite included in a Notification.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___
<a id="imagedataforminwidth"></a>

###  imageDataForMinWidth

▸ **imageDataForMinWidth**(pth: *`string`*, minWidth: *`number`*): `Promise`<`string`>

*Defined in [API/files.ts:54](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/files.ts#L54)*

Get the best size image from a Thread with MEDIA type thread given a minimum width.

Note: pth is /, e.g., "Qm.../0"

**Parameters:**

| Name | Type |
| ------ | ------ |
| pth | `string` |
| minWidth | `number` |

**Returns:** `Promise`<`string`>

___
<a id="init"></a>

###  init

▸ **init**(seed: *`string`*, repoPath: *`string`*, logToDisk: *`boolean`*, debug: *`boolean`*): `Promise`<`void`>

*Defined in [API/index.ts:28](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/index.ts#L28)*

Initialize a new Textile Wallet

**Parameters:**

| Name | Type |
| ------ | ------ |
| seed | `string` |
| repoPath | `string` |
| logToDisk | `boolean` |
| debug | `boolean` |

**Returns:** `Promise`<`void`>

___
<a id="list"></a>

###  list

▸ **list**(): `Promise`<`IContactList`>

*Defined in [API/contacts.ts:26](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/contacts.ts#L26)*

List all known Contacts.

**Returns:** `Promise`<`IContactList`>

___
<a id="migrate"></a>

###  migrate

▸ **migrate**(repoPath: *`string`*): `Promise`<`void`>

*Defined in [API/index.ts:34](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/index.ts#L34)*

Manually migrate the repo to a new path.

**Parameters:**

| Name | Type |
| ------ | ------ |
| repoPath | `string` |

**Returns:** `Promise`<`void`>

___
<a id="migrationneeded"></a>

###  migrationNeeded

▸ **migrationNeeded**(): `void`

*Defined in [internalEvents.ts:74](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L74)*

**Returns:** `void`

___
<a id="newerror"></a>

###  newError

▸ **newError**(message: *`string`*, type: *`string`*): `void`

*Defined in [internalEvents.ts:16](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| type | `string` |

**Returns:** `void`

___
<a id="newnodestate"></a>

###  newNodeState

▸ **newNodeState**(state: *`NodeState`*): `void`

*Defined in [internalEvents.ts:29](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | `NodeState` |

**Returns:** `void`

___
<a id="noninitializederror"></a>

###  nonInitializedError

▸ **nonInitializedError**(): `void`

*Defined in [internalEvents.ts:20](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L20)*

**Returns:** `void`

___
<a id="peerid"></a>

###  peerId

▸ **peerId**(): `Promise`<`string`>

*Defined in [API/ipfs.ts:16](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/ipfs.ts#L16)*

Get node's IPFS peerId.

**Returns:** `Promise`<`string`>

___
<a id="peers"></a>

###  peers

▸ **peers**(): `Promise`<`IContactList`>

*Defined in [API/account.ts:42](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/account.ts#L42)*

List all Contacts.

**Returns:** `Promise`<`IContactList`>

___
<a id="prepare"></a>

###  prepare

▸ **prepare**(path: *`string`*, threadId: *`string`*): `Promise`<`IMobilePreparedFiles`>

*Defined in [API/files.ts:9](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/files.ts#L9)*

Use a Thread's Mill to prepare a raw file for adding to a Thread.

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |
| threadId | `string` |

**Returns:** `Promise`<`IMobilePreparedFiles`>

___
<a id="prepareasync"></a>

###  prepareAsync

▸ **prepareAsync**(path: *`string`*, threadId: *`string`*): `Promise`<`IMobilePreparedFiles`>

*Defined in [API/files.ts:16](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/files.ts#L16)*

prepare by async

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |
| threadId | `string` |

**Returns:** `Promise`<`IMobilePreparedFiles`>

___
<a id="read"></a>

###  read

▸ **read**(id_: *`string`*): `Promise`<`void`>

*Defined in [API/notifications.ts:26](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/notifications.ts#L26)*

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

*Defined in [API/notifications.ts:33](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/notifications.ts#L33)*

Mark all Notifications as read.

**Returns:** `Promise`<`void`>

___
<a id="refreshsession"></a>

###  refreshSession

▸ **refreshSession**(peerId: *`string`*): `Promise`<`ICafeSession` \| `undefined`>

*Defined in [API/cafes.ts:37](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/cafes.ts#L37)*

Refresh an existing session by peerId.

**Parameters:**

| Name | Type |
| ------ | ------ |
| peerId | `string` |

**Returns:** `Promise`<`ICafeSession` \| `undefined`>

___
<a id="register"></a>

###  register

▸ **register**(url: *`string`*, token: *`string`*): `Promise`<`void`>

*Defined in [API/cafes.ts:10](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/cafes.ts#L10)*

Register a new remote cafe.

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |
| token | `string` |

**Returns:** `Promise`<`void`>

___
<a id="remove"></a>

###  remove

▸ **remove**(id_: *`string`*): `Promise`<`void`>

*Defined in [API/contacts.ts:33](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/contacts.ts#L33)*

Remove a Contact by their ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`void`>

___
<a id="renamethread"></a>

###  renameThread

▸ **renameThread**(threadId: *`string`*, name: *`string`*): `Promise`<`void`>

*Defined in [API/threads.ts:27](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/threads.ts#L27)*

Rename a Thread by ThreadId.

**Parameters:**

| Name | Type |
| ------ | ------ |
| threadId | `string` |
| name | `string` |

**Returns:** `Promise`<`void`>

___
<a id="search"></a>

###  search

▸ **search**(query: *`IContactQuery`*, options: *`IQueryOptions`*): `Promise`<`string`>

*Defined in [API/contacts.ts:46](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/contacts.ts#L46)*

Search for Contacts over network.

**Parameters:**

| Name | Type |
| ------ | ------ |
| query | `IContactQuery` |
| options | `IQueryOptions` |

**Returns:** `Promise`<`string`>

___
<a id="seed"></a>

###  seed

▸ **seed**(): `Promise`<`string`>

*Defined in [API/account.ts:18](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/account.ts#L18)*

Get the account seed phrase to display to user.

**Returns:** `Promise`<`string`>

___
<a id="session"></a>

###  session

▸ **session**(peerId: *`string`*): `Promise`<`ICafeSession` \| `undefined`>

*Defined in [API/cafes.ts:17](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/cafes.ts#L17)*

Initialize a new session.

**Parameters:**

| Name | Type |
| ------ | ------ |
| peerId | `string` |

**Returns:** `Promise`<`ICafeSession` \| `undefined`>

___
<a id="sessions"></a>

###  sessions

▸ **sessions**(): `Promise`<`ICafeSessionList` \| `undefined`>

*Defined in [API/cafes.ts:27](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/cafes.ts#L27)*

List all sessions.

**Returns:** `Promise`<`ICafeSessionList` \| `undefined`>

___
<a id="setavatar"></a>

###  setAvatar

▸ **setAvatar**(id_: *`string`*): `Promise`<`void`>

*Defined in [API/profile.ts:41](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/profile.ts#L41)*

Set a new Avatar by ID.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`void`>

___
<a id="setlevel"></a>

###  setLevel

▸ **setLevel**(level: *`ILogLevel`*): `Promise`<`void`>

*Defined in [API/logs.ts:10](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/logs.ts#L10)*

Set the logging level for the Textile node.

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `ILogLevel` |

**Returns:** `Promise`<`void`>

___
<a id="setrecoveryphrase"></a>

###  setRecoveryPhrase

▸ **setRecoveryPhrase**(recoveryPhrase: *`string`*): `void`

*Defined in [internalEvents.ts:70](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| recoveryPhrase | `string` |

**Returns:** `void`

___
<a id="setusername"></a>

###  setUsername

▸ **setUsername**(username: *`string`*): `Promise`<`void`>

*Defined in [API/profile.ts:26](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/profile.ts#L26)*

Update the username.

**Parameters:**

| Name | Type |
| ------ | ------ |
| username | `string` |

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Defined in [API/index.ts:46](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/index.ts#L46)*

Start the Textile Node. Handled by Textile.nodeStart.

**Returns:** `Promise`<`void`>

___
<a id="startnodefinished"></a>

###  startNodeFinished

▸ **startNodeFinished**(): `void`

*Defined in [internalEvents.ts:38](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L38)*

**Returns:** `void`

___
<a id="stop"></a>

###  stop

▸ **stop**(): `Promise`<`void`>

*Defined in [API/index.ts:52](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/index.ts#L52)*

Stop the Textile Node.

**Returns:** `Promise`<`void`>

___
<a id="stopnodeafterdelaycancelled"></a>

###  stopNodeAfterDelayCancelled

▸ **stopNodeAfterDelayCancelled**(): `void`

*Defined in [internalEvents.ts:46](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L46)*

**Returns:** `void`

___
<a id="stopnodeafterdelaycomplete"></a>

###  stopNodeAfterDelayComplete

▸ **stopNodeAfterDelayComplete**(): `void`

*Defined in [internalEvents.ts:54](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L54)*

**Returns:** `void`

___
<a id="stopnodeafterdelayfinishing"></a>

###  stopNodeAfterDelayFinishing

▸ **stopNodeAfterDelayFinishing**(): `void`

*Defined in [internalEvents.ts:50](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L50)*

**Returns:** `void`

___
<a id="stopnodeafterdelaystarting"></a>

###  stopNodeAfterDelayStarting

▸ **stopNodeAfterDelayStarting**(): `void`

*Defined in [internalEvents.ts:42](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L42)*

**Returns:** `void`

___
<a id="summary"></a>

###  summary

▸ **summary**(): `Promise`<`ISummary`>

*Defined in [API/index.ts:72](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/index.ts#L72)*

Get the summary of node data

**Returns:** `Promise`<`ISummary`>

___
<a id="threads"></a>

###  threads

▸ **threads**(id_: *`string`*): `Promise`<`IThreadList`>

*Defined in [API/contacts.ts:39](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/contacts.ts#L39)*

List all Threads in common with a Contact.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`IThreadList`>

___
<a id="updateprofile"></a>

###  updateProfile

▸ **updateProfile**(): `void`

*Defined in [internalEvents.ts:62](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L62)*

**Returns:** `void`

___
<a id="username"></a>

###  username

▸ **username**(): `Promise`<`string` \| `undefined`>

*Defined in [API/profile.ts:18](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/profile.ts#L18)*

Get the username.

**Returns:** `Promise`<`string` \| `undefined`>

___
<a id="version"></a>

###  version

▸ **version**(): `Promise`<`string`>

*Defined in [API/index.ts:58](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/API/index.ts#L58)*

Get the Textile node version

**Returns:** `Promise`<`string`>

___
<a id="walletinitsuccess"></a>

###  walletInitSuccess

▸ **walletInitSuccess**(): `void`

*Defined in [internalEvents.ts:66](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L66)*

**Returns:** `void`

___

## Object literals

<a id="privateevents"></a>

### `<Const>` privateEvents

**privateEvents**: *`object`*

*Defined in [internalEvents.ts:9](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L9)*

<a id="privateevents.appnextstate"></a>

####  appNextState

**● appNextState**: *`string`* = "@textile/internal/appNextState"

*Defined in [internalEvents.ts:12](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L12)*

___
<a id="privateevents.backgroundtask"></a>

####  backgroundTask

**● backgroundTask**: *`string`* = "@textile/internal/backgroundTask"

*Defined in [internalEvents.ts:10](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L10)*

___
<a id="privateevents.createandstartnode"></a>

####  createAndStartNode

**● createAndStartNode**: *`string`* = "@textile/internal/createAndStartNode"

*Defined in [internalEvents.ts:11](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/internalEvents.ts#L11)*

___

___
<a id="publicevents"></a>

### `<Const>` publicEvents

**publicEvents**: *`object`*

*Defined in [events.ts:26](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L26)*

<a id="publicevents.node_online"></a>

####  NODE_ONLINE

**● NODE_ONLINE**: *`string`* = "NODE_ONLINE"

*Defined in [events.ts:45](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L45)*

___
<a id="publicevents.node_start"></a>

####  NODE_START

**● NODE_START**: *`string`* = "NODE_START"

*Defined in [events.ts:44](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L44)*

___
<a id="publicevents.node_stop"></a>

####  NODE_STOP

**● NODE_STOP**: *`string`* = "NODE_STOP"

*Defined in [events.ts:46](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L46)*

___
<a id="publicevents.notification"></a>

####  NOTIFICATION

**● NOTIFICATION**: *`string`* = "NOTIFICATION"

*Defined in [events.ts:49](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L49)*

___
<a id="publicevents.query_response"></a>

####  QUERY_RESPONSE

**● QUERY_RESPONSE**: *`string`* = "QUERY_RESPONSE"

*Defined in [events.ts:50](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L50)*

___
<a id="publicevents.thread_update"></a>

####  THREAD_UPDATE

**● THREAD_UPDATE**: *`string`* = "THREAD_UPDATE"

*Defined in [events.ts:48](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L48)*

___
<a id="publicevents.wallet_update"></a>

####  WALLET_UPDATE

**● WALLET_UPDATE**: *`string`* = "WALLET_UPDATE"

*Defined in [events.ts:47](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L47)*

___
<a id="publicevents.appnextstate"></a>

####  appNextState

**● appNextState**: *`string`* = "@textile/shared/appNextState"

*Defined in [events.ts:37](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L37)*

___
<a id="publicevents.appstatechange"></a>

####  appStateChange

**● appStateChange**: *`string`* = "@textile/shared/appStateChange"

*Defined in [events.ts:34](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L34)*

___
<a id="publicevents.backgroundtask"></a>

####  backgroundTask

**● backgroundTask**: *`string`* = "@textile/shared/backgroundTask"

*Defined in [events.ts:41](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L41)*

___
<a id="publicevents.createandstartnode"></a>

####  createAndStartNode

**● createAndStartNode**: *`string`* = "@textile/shared/createAndStartNode"

*Defined in [events.ts:28](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L28)*

___
<a id="publicevents.error"></a>

####  error

**● error**: *`string`* = "@textile/shared/error"

*Defined in [events.ts:42](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L42)*

___
<a id="publicevents.migrationneeded"></a>

####  migrationNeeded

**● migrationNeeded**: *`string`* = "@textile/shared/migrationNeeded"

*Defined in [events.ts:38](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L38)*

___
<a id="publicevents.newerrormessage"></a>

####  newErrorMessage

**● newErrorMessage**: *`string`* = "@textile/shared/newErrorMessage"

*Defined in [events.ts:36](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L36)*

___
<a id="publicevents.newnodestate"></a>

####  newNodeState

**● newNodeState**: *`string`* = "@textile/shared/newNodeState"

*Defined in [events.ts:27](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L27)*

___
<a id="publicevents.setrecoveryphrase"></a>

####  setRecoveryPhrase

**● setRecoveryPhrase**: *`string`* = "@textile/shared/setRecoveryPhrase"

*Defined in [events.ts:39](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L39)*

___
<a id="publicevents.startnodefinished"></a>

####  startNodeFinished

**● startNodeFinished**: *`string`* = "@textile/shared/startNodeFinished"

*Defined in [events.ts:29](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L29)*

___
<a id="publicevents.stopnodeafterdelaycancelled"></a>

####  stopNodeAfterDelayCancelled

**● stopNodeAfterDelayCancelled**: *`string`* = "@textile/shared/stopNodeAfterDelayCancelled"

*Defined in [events.ts:31](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L31)*

___
<a id="publicevents.stopnodeafterdelaycomplete"></a>

####  stopNodeAfterDelayComplete

**● stopNodeAfterDelayComplete**: *`string`* = "@textile/shared/stopNodeAfterDelayComplete"

*Defined in [events.ts:33](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L33)*

___
<a id="publicevents.stopnodeafterdelayfinishing"></a>

####  stopNodeAfterDelayFinishing

**● stopNodeAfterDelayFinishing**: *`string`* = "@textile/shared/stopNodeAfterDelayFinishing"

*Defined in [events.ts:32](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L32)*

___
<a id="publicevents.stopnodeafterdelaystarting"></a>

####  stopNodeAfterDelayStarting

**● stopNodeAfterDelayStarting**: *`string`* = "@textile/shared/stopNodeAfterDelayStarting"

*Defined in [events.ts:30](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L30)*

___
<a id="publicevents.updateprofile"></a>

####  updateProfile

**● updateProfile**: *`string`* = "@textile/shared/updateProfile"

*Defined in [events.ts:35](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L35)*

___
<a id="publicevents.walletinitsuccess"></a>

####  walletInitSuccess

**● walletInitSuccess**: *`string`* = "@textile/shared/walletInitSuccess"

*Defined in [events.ts:40](https://github.com/textileio/react-native-sdk/blob/bf4753d/lib/Textile/events.ts#L40)*

___

___

