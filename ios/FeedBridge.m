#import "FeedBridge.h"

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

@implementation FeedBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(list:(NSString*)reqStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *requestData = [[NSData alloc] initWithBase64EncodedString:reqStr options:0];
  FeedRequest *request = [[FeedRequest alloc] initWithData:requestData error:&error];
  FeedItemList *list = [Textile.instance.feed list:request error:&error];
  fulfillWithResultAndNilDefault([list.data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
}

@end

@implementation RCTBridge (FeedBridge)

- (FeedBridge *)feedBridge {
  return [self moduleForClass:[FeedBridge class]];
}

@end
