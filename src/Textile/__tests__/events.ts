import DeviceEvent from '../../../tests/__mocks__/DeviceEvent'
import NativeEvent from '../../../tests/__mocks__/NativeEvent'

const DeviceEventEmitter = new DeviceEvent()

jest.mock('react-native', () => {
  return {
    DeviceEventEmitter: new DeviceEvent(),
    NativeModules: {
    },
    Platform: {
      OS: 'android',
      select: jest.fn(() => new NativeEvent())
    },
    NativeEventEmitter: NativeEvent
  }
})

import TextileEvents from '../events'
import { appStateChange } from '../internalEvents'

describe('rn events', () => {
  describe('correctly fire', () => {
    it('serialize in and out to same', async () => {
      const textileEvents = new TextileEvents()
      expect.assertions(2)
      function callback(payload: any) {
        expect(payload.previousState).toBe('background')
        expect(payload.newState).toBe('active')
      }
      textileEvents.addListener('appStateChange', callback)
      appStateChange('background', 'active')
    })
  })
})
