import Textile from '../'
import { NodeState } from '../Models'
import { delay } from '../helpers'

describe('rn textile', () => {
  describe('stateless functions', () => {
    it('selectors', async () => {
      await expect(Textile.appState()).resolves.toEqual('unknown')
      await expect(Textile.nodeOnline()).resolves.toEqual(false)
      await expect(Textile.nodeState()).resolves.toEqual(NodeState.nonexistent)
    })
  })
  describe('state functions should error when not initialized', () => {
    it('starts successfully', async () => {
      expect(Textile.setup()).toMatchSnapshot()
      expect(Textile.isInitialized()).toEqual(true)
      await delay(50)
      await expect(Textile.appState()).resolves.toEqual('active')
    })
  })
  describe('Textile lifecycle should run as expected', () => {
    beforeAll(() => {
      if (!Textile.isInitialized()) {
        Textile.setup()
      }
    })
    it('creates node successfully', async () => {
      await expect(Textile.createAndStartNode()).resolves.toMatchSnapshot()
      await expect(Textile.appState()).resolves.toEqual('active')
      await expect(Textile.nodeOnline()).resolves.toEqual(false)
    })
    it('shuts down successfully', async () => {
      await expect(Textile.nodeOnline()).resolves.toEqual(false)
      await expect(Textile.shutDown()).resolves.toMatchSnapshot()
      await expect(Textile.nodeState()).resolves.toEqual('stopped')
      await expect(Textile.nodeOnline()).resolves.toMatchSnapshot()
    })
  })
})
