#import "CommentsBridge.h"

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

@implementation CommentsBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(add:(NSString*)blockId body:(NSString*)body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [Textile.instance.comments add:blockId body:body error:&error];
  fulfillWithResult(result, error, resolve, reject);
}

@end

@implementation RCTBridge (CommentsBridge)

- (CommentsBridge *)commentsBridge {
  return [self moduleForClass:[CommentsBridge class]];
}

@end
