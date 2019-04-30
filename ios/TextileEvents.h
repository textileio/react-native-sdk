#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import “RCTBridgeModule.h”
#else
#import "React/RCTBridgeModule.h"
#endif

#import <React/RCTBridge.h>
#import <React/RCTEventEmitter.h>
#import <Textile/TextileDelegate.h>

@interface TextileEvents : RCTEventEmitter <TextileDelegate, RCTBridgeModule>

@end

@interface RCTBridge (TextileEvents)

@property (nonatomic, readonly) TextileEvents *textileEvents;

@end
