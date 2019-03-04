import Events, { TextileEvents } from './Textile/events'
import Textile, { BackgroundTask } from './Textile'
import * as Node from './Textile/Node'
import * as util from './util'

export { Textile, Node, Events, BackgroundTask, TextileEvents, util }

export * from './Textile/Models'

export default new Textile({})
