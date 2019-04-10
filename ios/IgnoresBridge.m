#import "IgnoresBridge.h"

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

@implementation IgnoresBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(add:(NSString*)blockId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  fulfillWithResult([Textile.instance.ignores add:blockId error:&error], error, resolve, reject);
}

@end

@implementation RCTBridge (IgnoresBridge)

- (IgnoresBridge *)ignoresBridge {
  return [self moduleForClass:[IgnoresBridge class]];
}

@end
