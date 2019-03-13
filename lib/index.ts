import Events, { TextileEvents, BackgroundTask } from './Textile/events'
import Textile from './Textile'
import * as API from './Textile/API'

export { Textile, API, Events, BackgroundTask, TextileEvents }

export * from './Textile/Models'

export default new Textile({})
