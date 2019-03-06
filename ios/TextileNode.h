#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import “RCTBridgeModule.h”
#else
#import "React/RCTBridgeModule.h"
#endif

#import <React/RCTBridge.h>

@interface TextileNode : NSObject <RCTBridgeModule>
- (NSString *)_fileData:(NSString*)hash error:(NSError**)error;
- (NSString *)_imageFileDataForMinWidth:(NSString*)pth minWidth:(long)minWidth error:(NSError**)error;
@end

@interface RCTBridge (TextileNode)

@property (nonatomic, readonly) TextileNode *textileNode;

@end
