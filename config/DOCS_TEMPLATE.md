
React Native Textile
=====================

Installation
------------

`npm install @textile/react-native-sdk --save`

**Link the Framework**

`react-native link @textile/react-native-sdk`

Note: The iOS component of `@textile/react-native-sdk` should be installed using Cocoapods. Newer versions of React Native will auto link the library, and `react-native link` can be run otherwise.

**Update Android Gradle**

You'll need to add Textile's maven repository to your project `build.gradle`'s `allProjects.repositories` section:

```
maven { url "https://dl.bintray.com/textile/maven" }
```

**Other dependencies**

The Textile library also requires that your project has two other libraries installed. Following the installation instructions for the following two,

1.  [react-native-background-fetch](https://github.com/transistorsoft/react-native-background-fetch)
2.  [react-native-background-timer](https://github.com/ocetnik/react-native-background-timer)


### Typescript Types

@textile/react-native-sdk is written in TypeScript and compiled to JavaScript. You can use either in your app.

Examples
--------

### React Native Boilerplate

To jump right into a working app, see our demo [IPFS boilerplate app](https://github.com/textileio/react-native-boilerplate).

### Advanced Boilerplate

We also have a more advanced boilerplate that contains `react-navigation`, redux, and sagas together with Textile. Find that here, [advanced-react-native-boilerplate](https://github.com/textileio/advanced-react-native-boilerplate/tree/master).

Run Textile
-----------

At a minimum, you'll need to initialize Textile if required, then launch Textile. You'll also probably want to subscribe to many of the events emitted by Textile. You can see this below:

```javascript
import React from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';

import FS from 'react-native-fs';
import Textile from '@textile/react-native-sdk';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {version: ""};
  }

  componentDidMount() {
    this.setup();
  }

  async setup() {
    Textile.events.addNodeOnlineListener(this.nodeOnline);

    const repoPath = `${FS.DocumentDirectoryPath}/textile-go`;
    const initialized = await Textile.isInitialized(repoPath);
    if (!initialized) {
      const phrase = await Textile.initializeCreatingNewWalletAndAccount(repoPath, true, true);
      console.log("recovery phrase: ", phrase);
    }
    Textile.launch(repoPath, true);
    
    const version = await Textile.version();
    this.setState({version});
  }

  nodeOnline = () => {
    console.log("node online")
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text>Textile version: {this.state.version}</Text>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
```
