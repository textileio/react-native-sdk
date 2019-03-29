import Textile from '../../'
import * as API from '../../Textile/API'
import { NodeState } from '../Models'
import { delay } from '../helpers'

describe('rn textile', () => {
  describe('stateless functions', () => {
    it('selectors', async () => {
      await expect(Textile.getAppState()).resolves.toEqual('unknown')
      await expect(Textile.getNodeOnline()).resolves.toEqual(false)
      await expect(Textile.getNodeState()).resolves.toEqual(NodeState.nonexistent)
    })
  })
  describe('state functions should error when not initialized', () => {
    it('starts successfully', async () => {
      expect(Textile.setup()).toMatchSnapshot()
      await delay(50) // setup will create an async background init
      expect(Textile.getInitialized()).toEqual(true)
      await expect(Textile.getAppState()).resolves.toEqual('active')
    })
  })
  describe('Textile lifecycle should run as expected', () => {
    beforeAll(() => {
      if (!Textile.getInitialized()) {
        Textile.setup()
      }
    })
    it('creates node successfully', async () => {
      await expect(Textile.nodeCreateAndStart()).resolves.toMatchSnapshot()
      await expect(Textile.getAppState()).resolves.toEqual('active')
      await expect(Textile.getNodeOnline()).resolves.toEqual(false)
    })
    it('shuts down successfully', async () => {
      await expect(Textile.getNodeOnline()).resolves.toEqual(false)
      await expect(API.stop()).resolves.toMatchSnapshot()
    })
  })
})
