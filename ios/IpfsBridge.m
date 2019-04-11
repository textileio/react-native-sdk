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

RCT_EXPORT_METHOD(dataAtPath:(NSString*)pth resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *data = [Textile.instance.ipfs dataAtPath:pth error:&error];
  NSString *dataString = [data base64EncodedStringWithOptions:0];
  fulfillWithResultAndNilDefault(dataString, @"", error, resolve, reject);
}

@end

@implementation RCTBridge (IpfsBridge)

- (IpfsBridge *)ipfsBridge {
  return [self moduleForClass:[IpfsBridge class]];
}

@end
