#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import “RCTBridgeModule.h”
#else
#import "React/RCTBridgeModule.h"
#endif

#import <React/RCTBridge.h>

@interface LogsBridge : NSObject <RCTBridgeModule>

@end

@interface RCTBridge (LogsBridge)

@property (nonatomic, readonly) LogsBridge *logsBridge;

@end
