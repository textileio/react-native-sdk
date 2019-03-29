
React Native Textile
=====================

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
