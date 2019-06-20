#import "ProfileBridge.h"

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

@implementation ProfileBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(get:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Peer *peer = [Textile.instance.profile get:&error];
  fulfillWithResult([peer.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(name:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *name = [Textile.instance.profile name:&error];
  fulfillWithResult(name, error, resolve, reject);
}

RCT_EXPORT_METHOD(setName:(NSString*)name resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.profile setName:name error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(avatar:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *avatar = [Textile.instance.profile avatar:&error];
  fulfillWithResult(avatar, error, resolve, reject);
}

RCT_EXPORT_METHOD(setAvatar:(NSString *)item resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.profile setAvatar:item completion:^(Block * _Nullable block, NSError * _Nonnull error) {
    fulfillWithResult([block.data base64EncodedStringWithOptions:0], error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(accountThread:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Thread *thread = [Textile.instance.profile accountThread:&error];
  fulfillWithResult([thread.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

@end

@implementation RCTBridge (ProfileBridge)

- (ProfileBridge *)profileBridge {
  return [self moduleForClass:[ProfileBridge class]];
}

@end
