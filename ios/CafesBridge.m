#import "CafesBridge.h"

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

@implementation CafesBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(register:(NSString*)peerId token:(NSString*)token resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.cafes register:peerId token:token completion:^(NSError * _Nonnull error) {
    fulfillWithResult(nil, error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(session:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  CafeSession *session = [Textile.instance.cafes session:peerId error:&error];
  fulfillWithResult([session.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(sessions:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  CafeSessionList *list = [Textile.instance.cafes sessions:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(refreshSession:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.cafes refreshSession:peerId completion:^(CafeSession * _Nullable session, NSError * _Nonnull error) {
    fulfillWithResult([session.data base64EncodedStringWithOptions:0], error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(deregister:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.cafes deregister:peerId completion:^(NSError * _Nonnull error) {
    fulfillWithResult(nil, error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(checkMessages:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.cafes checkMessages:^(NSError * _Nonnull error) {
    fulfillWithResult(nil, error, resolve, reject);
  }];
}

@end

@implementation RCTBridge (CafesBridge)

- (CafesBridge *)cafesBridge {
  return [self moduleForClass:[CafesBridge class]];
}

@end

