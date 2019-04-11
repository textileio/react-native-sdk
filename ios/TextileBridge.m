#import "TextileBridge.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#import <Textile/TextileApi.h>
#import "TextileEvents.h"
#import "utils.h"

#define SYSTEM_VERSION_LESS_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)

@implementation TextileBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(initialize:(BOOL)debug logToDisk:(BOOL)logToDisk resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *phrase = [Textile initializeWithDebug:debug logToDisk:logToDisk error:&error];
  if (error) {
    fulfillWithResult(nil, error, resolve, reject);
  } else {
    TextileEvents *eventHandler = self.bridge.textileEvents;
    Textile.instance.delegate = eventHandler;
    fulfillWithResultAndNilDefault(phrase, @"", error, resolve, reject);
  }
}

RCT_EXPORT_METHOD(version:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *result = Textile.instance.version;
  fulfillWithResult(result, nil, resolve, reject);
}

RCT_EXPORT_METHOD(gitSummary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *result = Textile.instance.gitSummary;
  fulfillWithResult(result, nil, resolve, reject);
}

RCT_EXPORT_METHOD(summary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Summary *summary = [Textile.instance summary:&error];
  fulfillWithResult([summary.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

@end

@implementation RCTBridge (TextileBridge)

- (TextileBridge *)textileBridge {
  return [self moduleForClass:[TextileBridge class]];
}

@end
