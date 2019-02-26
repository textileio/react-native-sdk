import * as API from './Textile/API'
import Events, { TextileEvents } from './Textile/events'
import Textile, { BackgroundTask } from './Textile'
import * as util from './util'

export { Textile, API, Events, BackgroundTask, TextileEvents, util }

export * from './Textile/Models'

export default new Textile({})
