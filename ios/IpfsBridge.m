#import "IpfsBridge.h"

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

@implementation IpfsBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(peerId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  fulfillWithResult([Textile.instance.ipfs peerId:&error], error, resolve, reject);
}

RCT_EXPORT_METHOD(connect:(NSString*)multiaddr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  BOOL connected = [Textile.instance.ipfs swarmConnect:multiaddr error:&error];
  if (!error) {
    if (connected) {
      resolve(true);
    } else {
      reject(@"EUNSPECIFIED", @"connect", nil);;
    }
  } else {
    reject(@(error.code).stringValue, error.localizedDescription, error);
  }
}

RCT_EXPORT_METHOD(dataAtPath:(NSString*)pth resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.ipfs dataAtPath:pth completion:^(NSData * _Nullable data, NSString * _Nullable mediaType, NSError * _Nonnull error) {
    NSDictionary *result = @{
                             @"data" : [data base64EncodedStringWithOptions:0],
                             @"mediaType" : mediaType
                             };
    fulfillWithResult(result, error, resolve, reject);
  }];
}

@end

@implementation RCTBridge (IpfsBridge)

- (IpfsBridge *)ipfsBridge {
  return [self moduleForClass:[IpfsBridge class]];
}

@end
