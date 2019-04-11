#import "MessagesBridge.h"

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

@implementation MessagesBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(add:(NSString*)threadId body:(NSString*)body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [Textile.instance.messages add:threadId body:body error:&error];
  fulfillWithResult(result, error, resolve, reject);
}

RCT_EXPORT_METHOD(list:(NSString*)offset limit:(NSInteger)limit threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  TextList *list = [Textile.instance.messages list:offset limit:limit threadId:threadId error:&error];
  fulfillWithResultAndNilDefault([list.data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
}

@end

@implementation RCTBridge (MessagesBridge)

- (MessagesBridge *)messagesBridge {
  return [self moduleForClass:[MessagesBridge class]];
}

@end
