import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform
} from 'react-native'
import { Buffer } from 'buffer'

import {
  Notification,
  Thread,
  Contact,
  INotification,
  IThread,
  IContact,
  EventSubscription,
  FeedItemType,
  FeedItemData,
  ICafeSyncGroupStatus,
  CafeSyncGroupStatus
} from './model'
import { toFeedItemData } from './util-internal'

const { TextileEvents } = NativeModules
const eventEmitter = Platform.select({
  android: DeviceEventEmitter,
  ios: new NativeEventEmitter(TextileEvents)
})

let nodeStartedListeners: Array<() => void> = []
let nodeFailedToStartListeners: Array<(error: string) => void> = []
let nodeStoppedListeners: Array<() => void> = []
let nodeFailedToStopListeners: Array<(error: string) => void> = []
let nodeOnlineListeners: Array<() => void> = []
let willStopNodeInBackgroundAfterDelayListeners: Array<
  (seconds: number) => void
> = []
let canceledPendingNodeStopListeners: Array<() => void> = []
let notificationReceivedListeners: Array<
  (notification: INotification) => void
> = []
let threadUpdateReceivedListeners: Array<
  (threadId: string, feedItem: FeedItemData) => void
> = []
let threadAddedListeners: Array<(threadId: string) => void> = []
let threadRemovedListeners: Array<(threadId: string) => void> = []
let accountPeerAddedListeners: Array<(peerId: string) => void> = []
let accountPeerRemovedListeners: Array<(peerId: string) => void> = []
let queryDoneListeners: Array<any> = []
let queryErrorListeners: Array<any> = []
let pubsubQueryResultListeners: Array<{
  listener: (queryId: string, message: string, messageId: string) => void
  queryId: string
}> = []
let clientThreadQueryResultListeners: Array<
  (queryId: string, thread: IThread) => void
> = []
let contactQueryResultListeners: Array<
  (queryId: string, contact: IContact) => void
> = []
let syncUpdateListeners: Array<(syncUpdate: ICafeSyncGroupStatus) => void> = []
let syncCompleteListeners: Array<
  (syncUpdate: ICafeSyncGroupStatus) => void
> = []
let syncFailedListeners: Array<(syncUpdate: ICafeSyncGroupStatus) => void> = []

export function addNodeStartedListener(listener: () => void) {
  nodeStartedListeners.push(listener)
  return new EventSubscription(
    () =>
      (nodeStartedListeners = nodeStartedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addNodeFailedToStartListener(
  listener: (error: string) => void
) {
  nodeFailedToStartListeners.push(listener)
  return new EventSubscription(
    () =>
      (nodeFailedToStartListeners = nodeFailedToStartListeners.filter(
        item => item !== listener
      ))
  )
}

export function addNodeStoppedListener(listener: () => void) {
  nodeStoppedListeners.push(listener)
  return new EventSubscription(
    () =>
      (nodeStoppedListeners = nodeStoppedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addNodeFailedToStopListener(listener: (error: string) => void) {
  nodeFailedToStopListeners.push(listener)
  return new EventSubscription(
    () =>
      (nodeFailedToStopListeners = nodeFailedToStopListeners.filter(
        item => item !== listener
      ))
  )
}

export function addNodeOnlineListener(listener: () => void) {
  nodeOnlineListeners.push(listener)
  return new EventSubscription(
    () =>
      (nodeOnlineListeners = nodeOnlineListeners.filter(
        item => item !== listener
      ))
  )
}

// tslint:disable-next-line:max-line-length
export function addWillStopNodeInBackgroundAfterDelayListener(
  listener: (seconds: number) => void
) {
  willStopNodeInBackgroundAfterDelayListeners.push(listener)
  return new EventSubscription(
    // tslint:disable-next-line:max-line-length
    () =>
      (willStopNodeInBackgroundAfterDelayListeners = willStopNodeInBackgroundAfterDelayListeners.filter(
        item => item !== listener
      ))
  )
}

export function addCanceledPendingNodeStopListener(listener: () => void) {
  canceledPendingNodeStopListeners.push(listener)
  return new EventSubscription(
    () =>
      (canceledPendingNodeStopListeners = canceledPendingNodeStopListeners.filter(
        item => item !== listener
      ))
  )
}

// tslint:disable-next-line:max-line-length
export function addNotificationReceivedListener(
  listener: (notification: INotification) => void
) {
  notificationReceivedListeners.push(listener)
  return new EventSubscription(
    () =>
      (notificationReceivedListeners = notificationReceivedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addThreadUpdateReceivedListener(
  listener: (threadId: string, feedItem: FeedItemData) => void
) {
  threadUpdateReceivedListeners.push(listener)
  return new EventSubscription(
    () =>
      (threadUpdateReceivedListeners = threadUpdateReceivedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addThreadAddedListener(listener: (threadId: string) => void) {
  threadAddedListeners.push(listener)
  return new EventSubscription(
    () =>
      (threadAddedListeners = threadAddedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addThreadRemovedListener(listener: (threadId: string) => void) {
  threadRemovedListeners.push(listener)
  return new EventSubscription(
    () =>
      (threadRemovedListeners = threadRemovedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addAccountPeerAddedListener(
  listener: (peerId: string) => void
) {
  accountPeerAddedListeners.push(listener)
  return new EventSubscription(
    () =>
      (accountPeerAddedListeners = accountPeerAddedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addAccountPeerRemovedListener(
  listener: (peerId: string) => void
) {
  accountPeerRemovedListeners.push(listener)
  return new EventSubscription(
    () =>
      (accountPeerRemovedListeners = accountPeerRemovedListeners.filter(
        item => item !== listener
      ))
  )
}

export function addQueryDoneListener(
  listener: (queryId: string) => void,
  queryId?: string
) {
  queryDoneListeners.push(
    queryId
      ? {
          listener,
          queryId
        }
      : listener
  )
  return new EventSubscription(
    () =>
      (queryDoneListeners = queryDoneListeners.filter(item =>
        item.queryId ? item.queryId !== queryId : item !== listener
      ))
  )
}

export function addQueryErrorListener(
  listener: (queryId: string, error: string) => void,
  queryId?: string
) {
  queryErrorListeners.push(
    queryId
      ? {
          listener,
          queryId
        }
      : listener
  )
  return new EventSubscription(
    () =>
      (queryErrorListeners = queryErrorListeners.filter(item =>
        item.queryId ? item.queryId !== queryId : item !== listener
      ))
  )
}

export function addPubsubQueryResultListener(
  listener: (queryId: string, message: string, messageId: string) => void,
  queryId: string,
  queryHandle: { close: () => void }
) {
  pubsubQueryResultListeners.push({
    listener,
    queryId
  })
  return new EventSubscription(() => {
    pubsubQueryResultListeners = pubsubQueryResultListeners.filter(
      item => item.queryId !== queryId
    )
    queryDoneListeners = queryDoneListeners.filter(
      item => item.queryId !== queryId
    )
    queryErrorListeners = queryErrorListeners.filter(
      item => item.queryId !== queryId
    )
    queryHandle.close()
  })
}

export function addClientThreadQueryResultListener(
  listener: (queryId: string, thread: IThread) => void
) {
  clientThreadQueryResultListeners.push(listener)
  return new EventSubscription(
    () =>
      (clientThreadQueryResultListeners = clientThreadQueryResultListeners.filter(
        item => item !== listener
      ))
  )
}

export function addContactQueryResultListener(
  listener: (queryId: string, contact: IContact) => void
) {
  contactQueryResultListeners.push(listener)
  return new EventSubscription(
    () =>
      (contactQueryResultListeners = contactQueryResultListeners.filter(
        item => item !== listener
      ))
  )
}

export function addSyncUpdateListener(
  listener: (syncUpdate: ICafeSyncGroupStatus) => void
) {
  syncUpdateListeners.push(listener)
  return new EventSubscription(
    () =>
      (syncUpdateListeners = syncUpdateListeners.filter(
        item => item !== listener
      ))
  )
}

export function addSyncCompleteListener(
  listener: (syncUpdate: ICafeSyncGroupStatus) => void
) {
  syncCompleteListeners.push(listener)
  return new EventSubscription(
    () =>
      (syncCompleteListeners = syncCompleteListeners.filter(
        item => item !== listener
      ))
  )
}

export function addSyncFailedListener(
  listener: (syncUpdate: ICafeSyncGroupStatus) => void
) {
  syncFailedListeners.push(listener)
  return new EventSubscription(
    () =>
      (syncFailedListeners = syncFailedListeners.filter(
        item => item !== listener
      ))
  )
}

eventEmitter.addListener('NODE_STARTED', () => {
  for (const listener of nodeStartedListeners) {
    listener()
  }
})

eventEmitter.addListener('NODE_FAILED_TO_START', error => {
  for (const listener of nodeFailedToStartListeners) {
    listener(error)
  }
})

eventEmitter.addListener('NODE_STOPPED', () => {
  for (const listener of nodeStoppedListeners) {
    listener()
  }
})

eventEmitter.addListener('NODE_FAILED_TO_STOP', error => {
  for (const listener of nodeFailedToStopListeners) {
    listener(error)
  }
})

eventEmitter.addListener('NODE_ONLINE', () => {
  for (const listener of nodeOnlineListeners) {
    listener()
  }
})

eventEmitter.addListener(
  'WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY',
  seconds => {
    for (const listener of willStopNodeInBackgroundAfterDelayListeners) {
      listener(seconds)
    }
  }
)

eventEmitter.addListener('CANCELED_PENDING_NODE_STOP', () => {
  for (const listener of canceledPendingNodeStopListeners) {
    listener()
  }
})

eventEmitter.addListener('NOTIFICATION_RECEIVED', base64 => {
  const notification = Notification.decode(Buffer.from(base64, 'base64'))
  for (const listener of notificationReceivedListeners) {
    listener(notification)
  }
})

eventEmitter.addListener(
  'THREAD_UPDATE_RECEIVED',
  (dict: {
    threadId: string
    block: string
    type: FeedItemType
    data: string
  }) => {
    const { threadId, block, type, data } = dict
    const feedItemData = toFeedItemData(type, block, data)
    for (const listener of threadUpdateReceivedListeners) {
      listener(threadId, feedItemData)
    }
  }
)

eventEmitter.addListener('THREAD_ADDED', threadId => {
  for (const listener of threadAddedListeners) {
    listener(threadId)
  }
})

eventEmitter.addListener('THREAD_REMOVED', threadId => {
  for (const listener of threadRemovedListeners) {
    listener(threadId)
  }
})

eventEmitter.addListener('ACCOUNT_PEER_ADDED', peerId => {
  for (const listener of accountPeerAddedListeners) {
    listener(peerId)
  }
})

eventEmitter.addListener('ACCOUNT_PEER_REMOVED', peerId => {
  for (const listener of accountPeerRemovedListeners) {
    listener(peerId)
  }
})

eventEmitter.addListener('QUERY_DONE', queryId => {
  for (const listener of queryDoneListeners) {
    if (listener.queryId && listener.queryId === queryId) {
      listener.listener(queryId)
    } else {
      listener(queryId)
    }
  }

  pubsubQueryResultListeners = pubsubQueryResultListeners.filter(
    item => item.queryId !== queryId
  )
  queryDoneListeners = queryDoneListeners.filter(
    item => item.queryId !== queryId
  )
  queryErrorListeners = queryErrorListeners.filter(
    item => item.queryId !== queryId
  )
})

eventEmitter.addListener('QUERY_ERROR', payload => {
  const { queryId, error } = payload
  for (const listener of queryErrorListeners) {
    if (listener.queryId && listener.queryId === queryId) {
      listener.listener(queryId, error)
    } else {
      listener(queryId, error)
    }
  }
})

eventEmitter.addListener('PUBSUB_QUERY_RESULT', payload => {
  const { queryId, message, messageId } = payload
  for (const item of pubsubQueryResultListeners) {
    if (item.queryId === queryId) {
      item.listener(queryId, message, messageId)
    }
  }
})

eventEmitter.addListener('CLIENT_THREAD_QUERY_RESULT', payload => {
  const { queryId, data } = payload
  const thread = Thread.decode(Buffer.from(data, 'base64'))
  for (const listener of clientThreadQueryResultListeners) {
    listener(queryId, thread)
  }
})

eventEmitter.addListener('CONTACT_QUERY_RESULT', payload => {
  const { queryId, data } = payload
  const contact = Contact.decode(Buffer.from(data, 'base64'))
  for (const listener of contactQueryResultListeners) {
    listener(queryId, contact)
  }
})

eventEmitter.addListener('SYNC_UPDATE', base64 => {
  const status = CafeSyncGroupStatus.decode(Buffer.from(base64, 'base64'))
  for (const listener of syncUpdateListeners) {
    listener(status)
  }
})

eventEmitter.addListener('SYNC_COMPLETE', base64 => {
  const status = CafeSyncGroupStatus.decode(Buffer.from(base64, 'base64'))
  for (const listener of syncCompleteListeners) {
    listener(status)
  }
})

eventEmitter.addListener('SYNC_FAILED', base64 => {
  const status = CafeSyncGroupStatus.decode(Buffer.from(base64, 'base64'))
  for (const listener of syncFailedListeners) {
    listener(status)
  }
})
