#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#import <Textile/FeedItemData.h>

void fulfillWithResult(id result, NSError *error, RCTPromiseResolveBlock resolve, RCTPromiseRejectBlock reject);

NSString * feedItemDataToBase64(FeedItemData *feedItemData);
