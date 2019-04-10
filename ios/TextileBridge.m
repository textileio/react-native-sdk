#import "TextileBridge.h"

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

@implementation TextileBridge

RCT_EXPORT_MODULE();

@end

@implementation RCTBridge (TextileBridge)

- (TextileBridge *)textileBridge {
  return [self moduleForClass:[TextileBridge class]];
}

@end
