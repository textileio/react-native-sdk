#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

void fulfillWithResult(id result, NSError *error, RCTPromiseResolveBlock resolve, RCTPromiseRejectBlock reject);
