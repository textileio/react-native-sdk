
React Native Textile Docs
=========================

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

### Classes

* [Textile](classes/textile.md)

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
* [avatar](#avatar)
* [cancelFindThreadBackups](#cancelfindthreadbackups)
* [cancelSearch](#cancelsearch)
* [checkMessages](#checkmessages)
* [countUnread](#countunread)
* [create](#create)
* [data](#data)
* [dataAtPath](#dataatpath)
* [decrypt](#decrypt)
* [deregister](#deregister)
* [encrypt](#encrypt)
* [get](#get)
* [gitSummary](#gitsummary)
* [ignoreInvite](#ignoreinvite)
* [imageDataForMinWidth](#imagedataforminwidth)
* [init](#init)
* [list](#list)
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
* [setUsername](#setusername)
* [start](#start)
* [stop](#stop)
* [summary](#summary)
* [threads](#threads)
* [username](#username)
* [version](#version)

### Object literals

* [publicEvents](#publicevents)

---

## Type aliases

<a id="textileevents"></a>

###  TextileEvents

**Ƭ TextileEvents**: *"newNodeState" \| "createAndStartNode" \| "startNodeFinished" \| "stopNodeAfterDelayStarting" \| "stopNodeAfterDelayCancelled" \| "stopNodeAfterDelayFinishing" \| "stopNodeAfterDelayComplete" \| "appStateChange" \| "updateProfile" \| "newErrorMessage" \| "appNextState" \| "migrationNeeded" \| "setRecoveryPhrase" \| "walletInitSuccess" \| "backgroundTask" \| "error" \| "NODE_START" \| "NODE_ONLINE" \| "NODE_STOP" \| "WALLET_UPDATE" \| "THREAD_UPDATE" \| "NOTIFICATION" \| "QUERY_RESPONSE"*

TextileEvents contain all of the event types you can subscribe to.

```typescript
Textile.addListener('newNodeState', callback);
```

___

## Functions

<a id="backgroundtask"></a>

###  BackgroundTask

▸ **BackgroundTask**(): `void`

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

Accept an external invite.

```typescript
API.invites.acceptExternal(id, key);
```

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

Accept an Invite included in a Notification.

```typescript
API.notifications.acceptInvite(id);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___
<a id="accountat"></a>

###  accountAt

▸ **accountAt**(phrase: *`string`*, index: *`number`*, password?: *`undefined` \| `string`*): `Promise`<`IMobileWalletAccount`>

Get Account information from Wallet.

```typescript
API.wallet.accountAt(phrase, index);
```

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

Add a new comment to a Thread by blockId.

```typescript
API.comments.add(blockId, body);
```

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

Add a file by target.

```typescript
API.files.addByTarget(target, threadId);
```

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

Add an external Thread invite, returning an HTTPS link.

```typescript
API.invites.addExternal(threadId);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| threadId | `string` |

**Returns:** `Promise`<`INewInvite`>

___
<a id="addorupdate"></a>

###  addOrUpdate

▸ **addOrUpdate**(thread: *`IThread`*): `Promise`<`void`>

Add a Thread or update metadata if new.

```typescript
API.threads.addOrUpdate(thread);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| thread | `IThread` |

**Returns:** `Promise`<`void`>

___
<a id="address"></a>

###  address

▸ **address**(): `Promise`<`string`>

Get the account address.

```typescript
const address = API.account.address();
```

**Returns:** `Promise`<`string`>

___
<a id="avatar"></a>

###  avatar

▸ **avatar**(): `Promise`<`string` \| `undefined`>

Get the BlockId of the current user Avatar.

```typescript
API.profile.avatar();
```

**Returns:** `Promise`<`string` \| `undefined`>

___
<a id="cancelfindthreadbackups"></a>

###  cancelFindThreadBackups

▸ **cancelFindThreadBackups**(): `Promise`<`void`>

Cancel an ongoing Thread backup search.

**Returns:** `Promise`<`void`>

___
<a id="cancelsearch"></a>

###  cancelSearch

▸ **cancelSearch**(): `Promise`<`void`>

Cancel an ongoing contact search.

```typescript
API.contacts.cancelSearch();
```

**Returns:** `Promise`<`void`>

___
<a id="checkmessages"></a>

###  checkMessages

▸ **checkMessages**(): `Promise`<`void`>

Check for offline messages on remote Cafe.

```typescript
API.cafe.checkMessages();
```

**Returns:** `Promise`<`void`>

___
<a id="countunread"></a>

###  countUnread

▸ **countUnread**(): `Promise`<`number`>

Get count of unread Notifications.

```typescript
API.notifications.countUnread();
```

**Returns:** `Promise`<`number`>

___
<a id="create"></a>

###  create

▸ **create**(wordCount: *`number`*): `Promise`<`string`>

Create the Textile Wallet. Handled by Textile.nodeCreate.

```typescript
API.wallet.create(wordCount);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| wordCount | `number` |

**Returns:** `Promise`<`string`>

___
<a id="data"></a>

###  data

▸ **data**(hash: *`string`*): `Promise`<`string`>

Get the raw data for a file at an IPFS hash.

```typescript
API.files.fileData(hash);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |

**Returns:** `Promise`<`string`>

___
<a id="dataatpath"></a>

###  dataAtPath

▸ **dataAtPath**(path: *`string`*): `Promise`<`string`>

Get raw file data by IPFS path. See `cat` method in IPFS.

```typescript
API.ipfs.dataAtPath(path);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |

**Returns:** `Promise`<`string`>

___
<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(input: *`Buffer`*): `Promise`<`Buffer`>

Decrypt a file previously encrypted with the account address.

```typescript
const decrypted = API.account.decrypt(encrypted);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `Buffer` |

**Returns:** `Promise`<`Buffer`>

___
<a id="deregister"></a>

###  deregister

▸ **deregister**(id: *`string`*): `Promise`<`void`>

Deregister a remote Cafe.

```typescript
API.cafe.deregister();
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Promise`<`void`>

___
<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(input: *`Buffer`*): `Promise`<`Buffer`>

Encrypt any file with the account address.

```typescript
const encrypted = API.account.encrypt(Buffer.from(JSON.stringify({foo:"bar"})));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `Buffer` |

**Returns:** `Promise`<`Buffer`>

___
<a id="get"></a>

###  get

▸ **get**(id_: *`string`*): `Promise`<`IContact` \| `undefined`>

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

Get the latest git summary

```typescript
API.gitSummary();
```

**Returns:** `Promise`<`string`>

___
<a id="ignoreinvite"></a>

###  ignoreInvite

▸ **ignoreInvite**(id_: *`string`*): `Promise`<`string`>

Ignore an Invite included in a Notification.

```typescript
API.notifications.ignoreInvite(id);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`string`>

___
<a id="imagedataforminwidth"></a>

###  imageDataForMinWidth

▸ **imageDataForMinWidth**(pth: *`string`*, minWidth: *`number`*): `Promise`<`string`>

Get the best size image from a Thread with MEDIA type thread given a minimum width.

Note: pth is /, e.g., "Qm.../0"

```typescript
API.files.imageDataForMinWidth(path, minWidth);
```

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

Initialize a new Textile Wallet

```typescript
API.init(seed, repo, logToDisk, debug);
```

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

List all known Contacts.

**Returns:** `Promise`<`IContactList`>

___
<a id="peerid"></a>

###  peerId

▸ **peerId**(): `Promise`<`string`>

Get node's IPFS peerId.

```typescript
API.ipfs.peerId();
```

**Returns:** `Promise`<`string`>

___
<a id="peers"></a>

###  peers

▸ **peers**(): `Promise`<`IContactList`>

List all Contacts.

```typescript
const contacts: pb.IContactList = API.account.peers();
```

**Returns:** `Promise`<`IContactList`>

___
<a id="prepare"></a>

###  prepare

▸ **prepare**(path: *`string`*, threadId: *`string`*): `Promise`<`IMobilePreparedFiles`>

Use a Thread's Mill to prepare a raw file for adding to a Thread.

```typescript
API.files.prepare(path, threadId);
```

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

prepare by async

```typescript
API.files.prepareAsync(path, threadId);
```

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

Mark a Notification as read by ID.

```typescript
API.notifications.read(id);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`void`>

___
<a id="readall"></a>

###  readAll

▸ **readAll**(): `Promise`<`void`>

Mark all Notifications as read.

```typescript
API.notifications.readAll();
```

**Returns:** `Promise`<`void`>

___
<a id="refreshsession"></a>

###  refreshSession

▸ **refreshSession**(peerId: *`string`*): `Promise`<`ICafeSession` \| `undefined`>

Refresh an existing session by peerId.

```typescript
API.cafe.refreshSession(peerId);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| peerId | `string` |

**Returns:** `Promise`<`ICafeSession` \| `undefined`>

___
<a id="register"></a>

###  register

▸ **register**(url: *`string`*, token: *`string`*): `Promise`<`void`>

Register a new remote cafe.

```typescript
API.cafes.register(url, token);
```

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

Rename a Thread by ThreadId.

```typescript
API.threads.renameThread(threadId, name);
```

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

Search for Contacts over network.

```typescript
API.contacts.search(query, options);
```

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

Get the account seed phrase to display to user.

```typescript
const seed = API.account.seed();
```

**Returns:** `Promise`<`string`>

___
<a id="session"></a>

###  session

▸ **session**(peerId: *`string`*): `Promise`<`ICafeSession` \| `undefined`>

Initialize a new session.

```typescript
API.cafe.session(peerId);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| peerId | `string` |

**Returns:** `Promise`<`ICafeSession` \| `undefined`>

___
<a id="sessions"></a>

###  sessions

▸ **sessions**(): `Promise`<`ICafeSessionList` \| `undefined`>

List all sessions.

```typescript
API.cafe.sessions();
```

**Returns:** `Promise`<`ICafeSessionList` \| `undefined`>

___
<a id="setavatar"></a>

###  setAvatar

▸ **setAvatar**(id_: *`string`*): `Promise`<`void`>

Set a new Avatar by ID.

```typescript
API.profile.setAvatar(id);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`void`>

___
<a id="setlevel"></a>

###  setLevel

▸ **setLevel**(level: *`ILogLevel`*): `Promise`<`void`>

Set the logging level for the Textile node.

```typescript
API.logs.setLevel(level);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `ILogLevel` |

**Returns:** `Promise`<`void`>

___
<a id="setusername"></a>

###  setUsername

▸ **setUsername**(username: *`string`*): `Promise`<`void`>

Update the username.

```typescript
API.profile.setUsername(username);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| username | `string` |

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

Start the Textile Node. Handled by Textile.nodeStart.

```typescript
API.start();
```

**Returns:** `Promise`<`void`>

___
<a id="stop"></a>

###  stop

▸ **stop**(): `Promise`<`void`>

Stop the Textile Node.

```typescript
API.stop();
```

**Returns:** `Promise`<`void`>

___
<a id="summary"></a>

###  summary

▸ **summary**(): `Promise`<`ISummary`>

Get the summary of node data

```typescript
API.summary();
```

**Returns:** `Promise`<`ISummary`>

___
<a id="threads"></a>

###  threads

▸ **threads**(id_: *`string`*): `Promise`<`IThreadList`>

List all Threads in common with a Contact.

```typescript
API.contacts.threads(id);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| id_ | `string` |

**Returns:** `Promise`<`IThreadList`>

___
<a id="username"></a>

###  username

▸ **username**(): `Promise`<`string` \| `undefined`>

Get the username.

```typescript
API.profile.username();
```

**Returns:** `Promise`<`string` \| `undefined`>

___
<a id="version"></a>

###  version

▸ **version**(): `Promise`<`string`>

Get the Textile node version

```typescript
API.version();
```

**Returns:** `Promise`<`string`>

___

## Object literals

<a id="publicevents"></a>

### `<Const>` publicEvents

**publicEvents**: *`object`*

<a id="publicevents.node_online"></a>

####  NODE_ONLINE

**● NODE_ONLINE**: *`string`* = "NODE_ONLINE"

___
<a id="publicevents.node_start"></a>

####  NODE_START

**● NODE_START**: *`string`* = "NODE_START"

___
<a id="publicevents.node_stop"></a>

####  NODE_STOP

**● NODE_STOP**: *`string`* = "NODE_STOP"

___
<a id="publicevents.notification"></a>

####  NOTIFICATION

**● NOTIFICATION**: *`string`* = "NOTIFICATION"

___
<a id="publicevents.query_response"></a>

####  QUERY_RESPONSE

**● QUERY_RESPONSE**: *`string`* = "QUERY_RESPONSE"

___
<a id="publicevents.thread_update"></a>

####  THREAD_UPDATE

**● THREAD_UPDATE**: *`string`* = "THREAD_UPDATE"

___
<a id="publicevents.wallet_update"></a>

####  WALLET_UPDATE

**● WALLET_UPDATE**: *`string`* = "WALLET_UPDATE"

___
<a id="publicevents.appnextstate"></a>

####  appNextState

**● appNextState**: *`string`* = "@textile/shared/appNextState"

___
<a id="publicevents.appstatechange"></a>

####  appStateChange

**● appStateChange**: *`string`* = "@textile/shared/appStateChange"

___
<a id="publicevents.backgroundtask"></a>

####  backgroundTask

**● backgroundTask**: *`string`* = "@textile/shared/backgroundTask"

___
<a id="publicevents.createandstartnode"></a>

####  createAndStartNode

**● createAndStartNode**: *`string`* = "@textile/shared/createAndStartNode"

___
<a id="publicevents.error"></a>

####  error

**● error**: *`string`* = "@textile/shared/error"

___
<a id="publicevents.migrationneeded"></a>

####  migrationNeeded

**● migrationNeeded**: *`string`* = "@textile/shared/migrationNeeded"

___
<a id="publicevents.newerrormessage"></a>

####  newErrorMessage

**● newErrorMessage**: *`string`* = "@textile/shared/newErrorMessage"

___
<a id="publicevents.newnodestate"></a>

####  newNodeState

**● newNodeState**: *`string`* = "@textile/shared/newNodeState"

___
<a id="publicevents.setrecoveryphrase"></a>

####  setRecoveryPhrase

**● setRecoveryPhrase**: *`string`* = "@textile/shared/setRecoveryPhrase"

___
<a id="publicevents.startnodefinished"></a>

####  startNodeFinished

**● startNodeFinished**: *`string`* = "@textile/shared/startNodeFinished"

___
<a id="publicevents.stopnodeafterdelaycancelled"></a>

####  stopNodeAfterDelayCancelled

**● stopNodeAfterDelayCancelled**: *`string`* = "@textile/shared/stopNodeAfterDelayCancelled"

___
<a id="publicevents.stopnodeafterdelaycomplete"></a>

####  stopNodeAfterDelayComplete

**● stopNodeAfterDelayComplete**: *`string`* = "@textile/shared/stopNodeAfterDelayComplete"

___
<a id="publicevents.stopnodeafterdelayfinishing"></a>

####  stopNodeAfterDelayFinishing

**● stopNodeAfterDelayFinishing**: *`string`* = "@textile/shared/stopNodeAfterDelayFinishing"

___
<a id="publicevents.stopnodeafterdelaystarting"></a>

####  stopNodeAfterDelayStarting

**● stopNodeAfterDelayStarting**: *`string`* = "@textile/shared/stopNodeAfterDelayStarting"

___
<a id="publicevents.updateprofile"></a>

####  updateProfile

**● updateProfile**: *`string`* = "@textile/shared/updateProfile"

___
<a id="publicevents.walletinitsuccess"></a>

####  walletInitSuccess

**● walletInitSuccess**: *`string`* = "@textile/shared/walletInitSuccess"

___

___

