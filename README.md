
# react-native-textile

## Getting started

`$ npm install  @textile/react-native-sdk --save`

### Mostly automatic installation

`$ react-native link @textile/react-native-sdk`

I also need to add `go-mobile` to the search paths of parent project,

```
Framework search paths: $(SRCROOT)/../node_modules/@textile/go-mobile/ios
Library search paths: $(SRCROOT)/../node_modules/@textile/go-mobile/ios
```

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@textile/react-native-sdk` and add `RNTextile.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNTextile.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import io.textile.rnmobile.RNTextilePackage;` to the imports at the top of the file
  - Add `new RNTextilePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-textile'
  	project(':react-native-textile').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-textile/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-textile')
  	```

## Hello World

```javascript
import * as Textile from '@textile/react-native-sdk'
import RNFS from 'react-native-fs'

// Local directory for on-disk storage
export const REPO_PATH = `${RNFS.DocumentDirectoryPath}/textile-go`

// If directory doesn't exist, create it
const repoPathExists: boolean = RNFS.exists(REPO_PATH)
if (!repoPathExists) {
  RNFS.mkdir(REPO_PATH)
  // Move all Textile files into our local folder
  RNFS.readDir(RNFS.DocumentDirectoryPath).then((files) => {
     for (const file of files) {
       if (file.path !== REPO_PATH && file.name !== 'RCTAsyncLocalStorage_V1') {
         RNFS.moveFile(file.path, `${REPO_PATH}/${file.name}`)
       }
     }
  })
}

Textile.newTextile(REPO_PATH, 'INFO')
Textile.start()
```
