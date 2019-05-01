#import "NotificationsBridge.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#import <Textile/TextileApi.h>
#import "utils.h"

#define SYSTEM_VERSION_LESS_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)

@implementation NotificationsBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(list:(NSString*)offset limit:(NSInteger)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NotificationList *list = [Textile.instance.notifications list:offset limit:limit error:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(countUnread:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  long result = [Textile.instance.notifications countUnread];
  fulfillWithResult([NSNumber numberWithLong:result], error, resolve, reject);
}

RCT_EXPORT_METHOD(read:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.notifications read:id_ error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(readAll:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.notifications readAll:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(acceptInvite:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [Textile.instance.notifications acceptInvite:id_ error:&error];
  fulfillWithResult(result, error, resolve, reject);
}

RCT_EXPORT_METHOD(ignoreInvite:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.notifications ignoreInvite:id_ error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

@end

@implementation RCTBridge (NotificationsBridge)

- (NotificationsBridge *)notificationsBridge {
  return [self moduleForClass:[NotificationsBridge class]];
}

@end
