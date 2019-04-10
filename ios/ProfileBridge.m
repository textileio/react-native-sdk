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

RCT_EXPORT_METHOD(get:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Peer *peer = [Textile.instance.profile get:&error];
  fulfillWithResultAndNilDefault([peer.data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
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
  fulfillWithResultAndNilDefault(avatar, @"", error, resolve, reject);
}

RCT_EXPORT_METHOD(setAvatar:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.profile setAvatar:id_ error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

@end

@implementation RCTBridge (ProfileBridge)

- (ProfileBridge *)profileBridge {
  return [self moduleForClass:[ProfileBridge class]];
}

@end
