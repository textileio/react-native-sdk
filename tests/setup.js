import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TextileNode from './__mocks__/TextileNode'
import AsyncStorage from './__mocks__/AsyncStorage'
import AppState from './__mocks__/AppState'

import DeviceEvent from './__mocks__/DeviceEvent'
import NativeEvent from './__mocks__/NativeEvent'

jest.mock('react-native', () => {
  return {
    AppState: new AppState(),
    AsyncStorage: new AsyncStorage(),
    DeviceEventEmitter: new DeviceEvent(),
    NativeModules: {
      TextileNode 
    },
    Platform: {
      OS: 'android',
      select: jest.fn(() => new NativeEvent())
    },
    NativeEventEmitter: NativeEvent
  }
})

/* tslint:disable:no-empty */
jest.mock('react-native-background-timer', () => {
  return {
    start: jest.fn(),
    stop: jest.fn()
  }
})
jest.mock('react-native-background-fetch', () => {
  return {
    finish:  jest.fn()
  }
})

jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn()
  }
})

jest.mock('CameraRoll', () => {
  return {
    getPhotos: jest.fn((payload) => new Promise((resolve) => {
      // TODO: do something meaningful with first
      // const { first } = payload
      resolve({
        edges: [
          {
            node: {
              image: {
                uri: '/disk/uri'
              }
            }
          }
        ]
      })
    }))
  }
})

global.fetch = require('jest-fetch-mock')
Enzyme.configure({ adapter: new Adapter() })
