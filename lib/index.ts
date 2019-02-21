import * as API from './Textile/API'
import Events, { TextileEvents } from './Textile/events'
import Textile, { BackgroundTask } from './Textile'

export { Textile, API, Events, BackgroundTask, TextileEvents }

export * from './Textile/Models'

export default new Textile({})
