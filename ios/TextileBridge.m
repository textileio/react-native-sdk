#import "TextileBridge.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#import <Textile/TextileApi.h>
#import "TextileHandler.h"
#import "utils.h"

#define SYSTEM_VERSION_LESS_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)

@implementation TextileBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initialize:(BOOL)debug logToDisk:(BOOL)logToDisk resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *phrase = [Textile initializeWithDebug:debug logToDisk:logToDisk error:&error];
  if (error) {
    fulfillWithResult(nil, error, resolve, reject);
  } else {
    Textile.instance.delegate = [[TextileHandler alloc] init];
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
