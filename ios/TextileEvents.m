#import "TextileEvents.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#import "TextileEvents.h"

@implementation TextileEvents

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[
           @"NODE_STARTED",
           @"NODE_FAILED_TO_START",
           @"NODE_STOPPED",
           @"NODE_FAILED_TO_STOP",
           @"NODE_ONLINE",
           @"WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY",
           @"CANCELED_PENDING_NODE_STOP",
           @"NOTIFICATION_RECEIVED",
           @"THREAD_UPDATE_RECEIVED",
           @"THREAD_ADDED",
           @"THREAD_REMOVED",
           @"ACCOUNT_PEER_ADDED",
           @"ACCOUNT_PEER_REMOVED",
           @"QUERY_DONE",
           @"QUERY_ERROR",
           @"CLIENT_THREAD_QUERY_RESULT",
           @"CONTACT_QUERY_RESULT"
         ];
}

- (void)nodeStarted {
  [self sendEventWithName:@"NODE_STARTED" body:nil];
}

- (void)nodeFailedToStartWithError:(NSError *)error {
  [self sendEventWithName:@"NODE_FAILED_TO_START" body:error.description];
}

- (void)nodeStopped {
  [self sendEventWithName:@"NODE_STOPPED" body:nil];
}

- (void)nodeFailedToStopWithError:(NSError *)error {
  [self sendEventWithName:@"NODE_FAILED_TO_STOP" body:error.description];
}

- (void)nodeOnline {
  [self sendEventWithName:@"NODE_ONLINE" body:nil];
}

- (void)willStopNodeInBackgroundAfterDelay:(NSTimeInterval)seconds {
  [self sendEventWithName:@"WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY" body:[NSNumber numberWithDouble:seconds]];
}

- (void)canceledPendingNodeStop {
  [self sendEventWithName:@"CANCELED_PENDING_NODE_STOP" body:nil];
}

- (void)notificationReceived:(Notification *)notification {
  [self sendEventWithName:@"NOTIFICATION_RECEIVED" body:[notification.data base64EncodedStringWithOptions:0]];
}

- (void)threadUpdateReceived:(FeedItem *)feedItem {
  [self sendEventWithName:@"THREAD_UPDATE_RECEIVED" body:[feedItem.data base64EncodedStringWithOptions:0]];
}

- (void)threadAdded:(NSString *)threadId {
  [self sendEventWithName:@"THREAD_ADDED" body:threadId];
}

- (void)threadRemoved:(NSString *)threadId {
  [self sendEventWithName:@"THREAD_REMOVED" body:threadId];
}

- (void)accountPeerAdded:(NSString *)peerId {
  [self sendEventWithName:@"ACCOUNT_PEER_ADDED" body:peerId];
}

- (void)accountPeerRemoved:(NSString *)peerId {
  [self sendEventWithName:@"ACCOUNT_PEER_REMOVED" body:peerId];
}

- (void)queryDone:(NSString *)queryId {
  [self sendEventWithName:@"QUERY_DONE" body:queryId];
}

- (void)queryError:(NSString *)queryId error:(NSError *)error {
  NSDictionary *body = @{
                         @"queryId": queryId,
                         @"error": error.description
                       };
  [self sendEventWithName:@"QUERY_ERROR" body:body];
}

- (void)clientThreadQueryResult:(NSString *)queryId thread:(Thread *)thread {
  NSDictionary *body = @{
                         @"queryId": queryId,
                         @"data": [thread.data base64EncodedStringWithOptions:0]
                       };
  [self sendEventWithName:@"CLIENT_THREAD_QUERY_RESULT" body:body];
}

- (void)contactQueryResult:(NSString *)queryId contact:(Contact *)contact {
  NSDictionary *body = @{
                         @"queryId": queryId,
                         @"data": [contact.data base64EncodedStringWithOptions:0]
                       };
  [self sendEventWithName:@"CONTACT_QUERY_RESULT" body:body];
}

@end

@implementation RCTBridge (TextileEvents)

- (TextileEvents *)textileEvents {
  return [self moduleForClass:[TextileEvents class]];
}

@end
