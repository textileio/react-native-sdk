#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import “RCTBridgeModule.h”
#else
#import "React/RCTBridgeModule.h"
#endif

#import <React/RCTBridge.h>

@interface LikesBridge : NSObject <RCTBridgeModule>

@end

@interface RCTBridge (LikesBridge)

@property (nonatomic, readonly) LikesBridge *likesBridge;

@end
