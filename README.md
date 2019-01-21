
# react-native-textile

## Getting started

`$ npm install  @textile/react-native-sdk --save`

### Mostly automatic installation

`$ react-native link @textile/react-native-sdk`

### Update framework search path

In Xcode
Textile/Libararies/RNTextile go to -> Build Settings -> Search Paths -> Frameworks and add `$(SRCROOT)/../node_modules/@textile/go-mobile/ios`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@textile/react-native-sdk` and add `RNTextile.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNTextile.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<


Note: In my setup I had to dd the following in Search Paths of RNTextile inside my Xcode project -> `Library Search Paths` and `Framework Search Paths`, `$(SRCROOT)/../../go-mobile/ios`

^ The above also seems to get removed whenever i do an upgrade of this library.

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


## Usage
```javascript
import RNTextile from 'react-native-textile';

// TODO: What to do with the module?
RNTextile;
```
