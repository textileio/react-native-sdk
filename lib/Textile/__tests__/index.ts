import Textile from '../'
import { NodeState } from '../Models'
import { delay } from '../helpers'

describe('rn textile', () => {
  describe('stateless functions', () => {
    it('selectors', async () => {
      expect(Textile.appState()).resolves.toEqual('unknown')
      expect(Textile.nodeOnline()).resolves.toEqual(false)
      expect(Textile.nodeState()).resolves.toEqual(NodeState.nonexistent)
    })
  })
  describe('state functions', () => {
    it('startup sequence', async () => {
      expect(Textile.isInitialized()).toEqual(false)
      expect(Textile.setup()).toMatchSnapshot()
      expect(Textile.isInitialized()).toEqual(true)
      await delay(50)
      expect(Textile.appState()).resolves.toEqual('active')
    })
  })
})
