//
//  TextileHandler.m
//  textile-react-native-sdk
//
//  Created by Aaron Sutula on 4/10/19.
//

#import "TextileHandler.h"
#import "Events.h"

@implementation TextileHandler

- (void)nodeStarted {
  [Events emitEventWithName:@"NODE_STARTED" andPayload:nil];
}

- (void)nodeFailedToStartWithError:(NSError *)error {
  [Events emitEventWithName:@"NODE_FAILED_TO_START" andPayload:error.description];
}

- (void)nodeStopped {
  [Events emitEventWithName:@"NODE_STOPPED" andPayload:nil];
}

- (void)nodeFailedToStopWithError:(NSError *)error {
  [Events emitEventWithName:@"NODE_FAILED_TO_STOP" andPayload:error.description];
}

- (void)nodeOnline {
  [Events emitEventWithName:@"NODE_ONLINE" andPayload:nil];
}

- (void)willStopNodeInBackgroundAfterDelay:(NSTimeInterval)seconds {
  [Events emitEventWithName:@"WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY" andPayload:@"<TODO: NOT SURE>"];
}

- (void)canceledPendingNodeStop {
  [Events emitEventWithName:@"CANCELED_PENDING_NODE_STOP" andPayload:nil];
}

- (void)notificationReceived:(Notification *)notification {
  [Events emitEventWithName:@"NOTIFICATION_RECEIVED" andPayload:[notification.data base64EncodedStringWithOptions:0]];
}

- (void)threadUpdateReceived:(FeedItem *)feedItem {
  [Events emitEventWithName:@"THREAD_UPDATE_RECEIVED" andPayload:[feedItem.data base64EncodedStringWithOptions:0]];
}

- (void)threadAdded:(NSString *)threadId {
  [Events emitEventWithName:@"THREAD_ADDED" andPayload:threadId];
}

- (void)threadRemoved:(NSString *)threadId {
  [Events emitEventWithName:@"THREAD_REMOVED" andPayload:threadId];
}

- (void)accountPeerAdded:(NSString *)peerId {
  [Events emitEventWithName:@"ACCOUNT_PEER_ADDED" andPayload:peerId];
}

- (void)accountPeerRemoved:(NSString *)peerId {
  [Events emitEventWithName:@"ACCOUNT_PEER_REMOVED" andPayload:peerId];
}

- (void)queryDone:(NSString *)queryId {
  [Events emitEventWithName:@"QUERY_DONE" andPayload:queryId];
}

- (void)queryError:(NSString *)queryId error:(NSError *)error {
  [Events emitEventWithName:@"QUERY_ERROR" andPayload:error.description];
}

- (void)clientThreadQueryResult:(NSString *)queryId thread:(Thread *)thread {
  // TODO: Get queryId in the payload
  [Events emitEventWithName:@"CLIENT_THREAD_QUERY_RESULT" andPayload:[thread.data base64EncodedStringWithOptions:0]];
}

- (void)contactQueryResult:(NSString *)queryId contact:(Contact *)contact {
  // TODO: Get queryId in the payload
  [Events emitEventWithName:@"CONTACT_QUERY_RESULT" andPayload:[contact.data base64EncodedStringWithOptions:0]];
}

@end
