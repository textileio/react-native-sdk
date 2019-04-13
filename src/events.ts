import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native'

import {
  Notification,
  FeedItem,
  Thread,
  Contact,
} from './model-internal'
import {
  INotification,
  IFeedItem,
  IThread,
  IContact,
  EventSubscription,
} from './model-public'

const { TextileEvents } = NativeModules
const eventEmitter = Platform.select({
  android: DeviceEventEmitter,
  ios: new NativeEventEmitter(TextileEvents),
})

let nodeStartedListeners: Array<() => void> = []
let nodeFailedToStartListeners: Array<(error: string) => void> = []
let nodeStoppedListeners: Array<() => void> = []
let nodeFailedToStopListeners: Array<(error: string) => void> = []
let nodeOnlineListeners: Array<() => void> = []
let willStopNodeInBackgroundAfterDelayListeners: Array<(seconds: number) => void> = []
let canceledPendingNodeStopListeners: Array<() => void> = []
let notificationReceivedListeners: Array<(notification: INotification) => void> = []
let threadUpdateReceivedListeners: Array<(feedItem: IFeedItem) => void> = []
let threadAddedListeners: Array<(threadId: string) => void> = []
let threadRemovedListeners: Array<(threadId: string) => void> = []
let accountPeerAddedListeners: Array<(peerId: string) => void> = []
let accountPeerRemovedListeners: Array<(peerId: string) => void> = []
let queryDoneListeners: Array<(queryId: string) => void> = []
let queryErrorListeners: Array<(queryId: string, error: string) => void> = []
let clientThreadQueryResultListeners: Array<(queryId: string, thread: IThread) => void> = []
let contactQueryResultListeners: Array<(queryId: string, contact: IContact) => void> = []

export function addNodeStartedListener(listener: () => void) {
  nodeStartedListeners.push(listener)
  return new EventSubscription(
    () => nodeStartedListeners = nodeStartedListeners.filter((item) => item !== listener),
  )
}

export function addNodeFailedToStartListener(listener: (error: string) => void) {
  nodeFailedToStartListeners.push(listener)
  return new EventSubscription(
    () => nodeFailedToStartListeners = nodeFailedToStartListeners.filter((item) => item !== listener),
  )
}

export function addNodeStoppedListener(listener: () => void) {
  nodeStoppedListeners.push(listener)
  return new EventSubscription(
    () => nodeStoppedListeners = nodeStoppedListeners.filter((item) => item !== listener),
  )
}

export function addNodeFailedToStopListener(listener: (error: string) => void) {
  nodeFailedToStopListeners.push(listener)
  return new EventSubscription(
    () => nodeFailedToStopListeners = nodeFailedToStopListeners.filter((item) => item !== listener),
  )
}

export function addNodeOnlineListener(listener: () => void) {
  nodeOnlineListeners.push(listener)
  return new EventSubscription(
    () => nodeOnlineListeners = nodeOnlineListeners.filter((item) => item !== listener),
  )
}

// tslint:disable-next-line:max-line-length
export function addWillStopNodeInBackgroundAfterDelayListener(listener: (seconds: number) => void) {
  willStopNodeInBackgroundAfterDelayListeners.push(listener)
  return new EventSubscription(
    // tslint:disable-next-line:max-line-length
    () => willStopNodeInBackgroundAfterDelayListeners = willStopNodeInBackgroundAfterDelayListeners.filter((item) => item !== listener),
  )
}

export function addCanceledPendingNodeStopListener(listener: () => void) {
  canceledPendingNodeStopListeners.push(listener)
  return new EventSubscription(
    () => canceledPendingNodeStopListeners = canceledPendingNodeStopListeners.filter((item) => item !== listener),
  )
}

// tslint:disable-next-line:max-line-length
export function addNotificationReceivedListener(listener: (notification: INotification) => void) {
  notificationReceivedListeners.push(listener)
  return new EventSubscription(
    () => notificationReceivedListeners = notificationReceivedListeners.filter((item) => item !== listener),
  )
}

export function addThreadUpdateReceivedListener(listener: (feedItem: IFeedItem) => void) {
  threadUpdateReceivedListeners.push(listener)
  return new EventSubscription(
    () => threadUpdateReceivedListeners = threadUpdateReceivedListeners.filter((item) => item !== listener),
  )
}

export function addThreadAddedListener(listener: (threadId: string) => void) {
  threadAddedListeners.push(listener)
  return new EventSubscription(
    () => threadAddedListeners = threadAddedListeners.filter((item) => item !== listener),
  )
}

export function addThreadRemovedListener(listener: (threadId: string) => void) {
  threadRemovedListeners.push(listener)
  return new EventSubscription(
    () => threadRemovedListeners = threadRemovedListeners.filter((item) => item !== listener),
  )
}

export function addAccountPeerAddedListener(listener: (peerId: string) => void) {
  accountPeerAddedListeners.push(listener)
  return new EventSubscription(
    () => accountPeerAddedListeners = accountPeerAddedListeners.filter((item) => item !== listener),
  )
}

export function addAccountPeerRemovedListener(listener: (peerId: string) => void) {
  accountPeerRemovedListeners.push(listener)
  return new EventSubscription(
    () => accountPeerRemovedListeners = accountPeerRemovedListeners.filter((item) => item !== listener),
  )
}

export function addQueryDoneListener(listener: (queryId: string) => void) {
  queryDoneListeners.push(listener)
  return new EventSubscription(
    () => queryDoneListeners = queryDoneListeners.filter((item) => item !== listener),
  )
}

export function addQueryErrorListener(listener: (queryId: string, error: string) => void) {
  queryErrorListeners.push(listener)
  return new EventSubscription(
    () => queryErrorListeners = queryErrorListeners.filter((item) => item !== listener),
  )
}

export function addClientThreadQueryResultListener(listener: (queryId: string, thread: IThread) => void) {
  clientThreadQueryResultListeners.push(listener)
  return new EventSubscription(
    () => clientThreadQueryResultListeners = clientThreadQueryResultListeners.filter((item) => item !== listener),
  )
}

export function addContactQueryResultListener(listener: (queryId: string, contact: IContact) => void) {
  contactQueryResultListeners.push(listener)
  return new EventSubscription(
    () => contactQueryResultListeners = contactQueryResultListeners.filter((item) => item !== listener),
  )
}

eventEmitter.addListener('NODE_STARTED', () => {
  for (const listener of nodeStartedListeners) {
    listener()
  }
})

eventEmitter.addListener('NODE_FAILED_TO_START', (error) => {
  for (const listener of nodeFailedToStartListeners) {
    listener(error)
  }
})

eventEmitter.addListener('NODE_STOPPED', () => {
  for (const listener of nodeStoppedListeners) {
    listener()
  }
})

eventEmitter.addListener('NODE_FAILED_TO_STOP', (error) => {
  for (const listener of nodeFailedToStopListeners) {
    listener(error)
  }
})

eventEmitter.addListener('NODE_ONLINE', () => {
  for (const listener of nodeOnlineListeners) {
    listener()
  }
})

eventEmitter.addListener('WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY', (seconds) => {
  for (const listener of willStopNodeInBackgroundAfterDelayListeners) {
    listener(seconds)
  }
})

eventEmitter.addListener('CANCELED_PENDING_NODE_STOP', () => {
  for (const listener of canceledPendingNodeStopListeners) {
    listener()
  }
})

eventEmitter.addListener('NOTIFICATION_RECEIVED', (base64) => {
  const notification = Notification.decode(Buffer.from(base64, 'base64'))
  for (const listener of notificationReceivedListeners) {
    listener(notification)
  }
})

eventEmitter.addListener('THREAD_UPDATE_RECEIVED', (base64) => {
  const feedItem = FeedItem.decode(Buffer.from(base64, 'base64'))
  for (const listener of threadUpdateReceivedListeners) {
    listener(feedItem)
  }
})

eventEmitter.addListener('THREAD_ADDED', (threadId) => {
  for (const listener of threadAddedListeners) {
    listener(threadId)
  }
})

eventEmitter.addListener('THREAD_REMOVED', (threadId) => {
  for (const listener of threadRemovedListeners) {
    listener(threadId)
  }
})

eventEmitter.addListener('ACCOUNT_PEER_ADDED', (peerId) => {
  for (const listener of accountPeerAddedListeners) {
    listener(peerId)
  }
})

eventEmitter.addListener('ACCOUNT_PEER_REMOVED', (peerId) => {
  for (const listener of accountPeerRemovedListeners) {
    listener(peerId)
  }
})

eventEmitter.addListener('QUERY_DONE', (queryId) => {
  for (const listener of queryDoneListeners) {
    listener(queryId)
  }
})

eventEmitter.addListener('QUERY_ERROR', (payload) => {
  const { queryId, error } = payload
  for (const listener of queryErrorListeners) {
    listener(queryId, error)
  }
})

eventEmitter.addListener('CLIENT_THREAD_QUERY_RESULT', (payload) => {
  const { queryId, data } = payload
  const thread = Thread.decode(Buffer.from(data, 'base64'))
  for (const listener of clientThreadQueryResultListeners) {
    listener(queryId, thread)
  }
})

eventEmitter.addListener('CONTACT_QUERY_RESULT', (payload) => {
  const { queryId, data } = payload
  const contact = Contact.decode(Buffer.from(data, 'base64'))
  for (const listener of contactQueryResultListeners) {
    listener(queryId, contact)
  }
})
