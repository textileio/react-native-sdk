// https://stackoverflow.com/questions/38818287/react-native-bridge-is-nil-when-i-call-method-from-another-method#answer-43543711

#import "Events.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#elif __has_include(“RCTEventDispatcher.h”)
#import “RCTEventDispatcher.h”
#else
#import “React/RCTEventDispatcher.h”
#endif

@implementation Events

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[@"NODE_START", @"NODE_ONLINE", @"NODE_STOP", @"WALLET_UPDATE", @"THREAD_UPDATE", @"NOTIFICATION", @"QUEUE_RESPONSE"];
}

- (void)startObserving
{
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(emitEventInternal:)
                                               name:@"event-emitted"
                                             object:nil];
}

- (void)stopObserving
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)emitEventInternal:(NSNotification *)notification
{
  NSArray *eventDetails = [notification.userInfo valueForKey:@"detail"];
  NSString *eventName = [eventDetails objectAtIndex:0];
  NSDictionary *eventData = [eventDetails objectAtIndex:1];

  [self sendEventWithName:eventName body:eventData];
}

+ (void)emitEventWithName:(NSString *)name andPayload:(NSString *)payload
{
  NSData *data = [payload dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  NSDictionary *eventDetail = @{@"detail":@[name,json]};
  [[NSNotificationCenter defaultCenter] postNotificationName:@"event-emitted"
                                                      object:self
                                                    userInfo:eventDetail];
}

@end
