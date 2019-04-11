#import "SchemasBridge.h"

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

@implementation SchemasBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(add:(NSString*)nodeStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *nodeData = [[NSData alloc] initWithBase64EncodedString:nodeStr options:0];
  Node *node = [[Node alloc] initWithData:nodeData error:&error];
  FileIndex *index = [Textile.instance.schemas add:node error:&error];
  fulfillWithResultAndNilDefault([index.data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
}

@end

@implementation RCTBridge (SchemasBridge)

- (SchemasBridge *)schemasBridge {
  return [self moduleForClass:[SchemasBridge class]];
}

@end
