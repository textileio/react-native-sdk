#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import “RCTBridgeModule.h”
#else
#import "React/RCTBridgeModule.h"
#endif

#import <React/RCTBridge.h>

@interface TextileBridge : NSObject <RCTBridgeModule>

@end

@interface RCTBridge (TextileBridge)

@property (nonatomic, readonly) TextileBridge *textileBridge;

@end
