#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import “RCTBridgeModule.h”
#else
#import "React/RCTBridgeModule.h"
#endif

#import <React/RCTBridge.h>

@interface FilesBridge : NSObject <RCTBridgeModule>

@end

@interface RCTBridge (FilesBridge)

@property (nonatomic, readonly) FilesBridge *filesBridge;

@end
