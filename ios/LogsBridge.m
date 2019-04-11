#import "LogsBridge.h"

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

@implementation LogsBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(setLevel:(NSString*)levelStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *logLevelData = [[NSData alloc] initWithBase64EncodedString:levelStr options:0];
  LogLevel *logLevel = [[LogLevel alloc] initWithData:logLevelData error:&error];
  [Textile.instance.logs setLevel:logLevel error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

@end

@implementation RCTBridge (LogsBridge)

- (LogsBridge *)logsBridge {
  return [self moduleForClass:[LogsBridge class]];
}

@end
