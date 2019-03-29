import Events, { TextileEvents, BackgroundTask } from './Textile/events'
import Textile from './Textile'
import * as API from './Textile/API'
import * as util from './Textile/util'

export { Textile, API, Events, BackgroundTask, TextileEvents, util }

export * from './Textile/Models'

export default new Textile({})
