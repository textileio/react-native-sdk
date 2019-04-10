#import "InvitesBridge.h"

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

@implementation InvitesBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(add:(NSString*)threadId inviteeId:(NSString*)address resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.invites add:threadId address:address error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(addExternal:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  ExternalInvite *invite = [Textile.instance.invites addExternal:threadId error:&error];
  fulfillWithResultAndNilDefault([invite.data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
}

RCT_EXPORT_METHOD(acceptExternal:(NSString*)id_ key:(NSString*)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [Textile.instance.invites acceptExternal:id_ key:key error:&error];
  fulfillWithResult(result, error, resolve, reject);
}

@end

@implementation RCTBridge (InvitesBridge)

- (InvitesBridge *)invitesBridge {
  return [self moduleForClass:[InvitesBridge class]];
}

@end

