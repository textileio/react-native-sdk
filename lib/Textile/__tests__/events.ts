import DeviceEvent from '../../../tests/__mocks__/DeviceEvent'

const DeviceEventEmitter = new DeviceEvent()

jest.mock('react-native', () => {
  return {
    DeviceEventEmitter
  }
})

import * as TextileEvents from '../events'

describe('rn events', () => {
  describe('correctly fire', () => {
    it('serialize in and out to same', async () => {
      expect.assertions(2)
      function callback(payload: any) {
        expect(payload.previousState).toBe('background')
        expect(payload.newState).toBe('active')
      }
      DeviceEventEmitter.addListener(TextileEvents.publicEvents.appStateChange, callback)
      TextileEvents.appStateChange('background', 'active')
    })
  })
})
