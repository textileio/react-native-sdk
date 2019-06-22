#import "FilesBridge.h"

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

@implementation FilesBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(addData:(NSString *)dataBase64 threadId:(NSString *)threadId caption:(NSString *)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSData *data = [[NSData alloc] initWithBase64EncodedString:dataBase64 options:0];
  [Textile.instance.files addData:data threadId:threadId caption:caption completion:^(Block * _Nullable block, NSError * _Nonnull error) {
    fulfillWithResult([block.data base64EncodedStringWithOptions:0], error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(addFiles:(NSString *)paths threadId:(NSString *)threadId caption:(NSString *)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.files addFiles:paths threadId:threadId caption:caption completion:^(Block * _Nullable block, NSError * _Nonnull error) {
    fulfillWithResult([block.data base64EncodedStringWithOptions:0], error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(shareFiles:(NSString *)target threadId:(NSString *)threadId caption:(NSString *)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.files shareFiles:target threadId:threadId caption:caption completion:^(Block * _Nullable block, NSError * _Nonnull error) {
    fulfillWithResult([block.data base64EncodedStringWithOptions:0], error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(list:(NSString*)threadId offset:(NSString*)offset limit:(NSInteger)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  FilesList *list = [Textile.instance.files list:threadId offset:offset limit:limit error:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(content:(NSString*)hash resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.files content:hash completion:^(NSData * _Nullable data, NSString * _Nullable mediaType, NSError * _Nonnull error) {
    NSDictionary *result = @{
                             @"data" : [data base64EncodedStringWithOptions:0],
                             @"mediaType" : mediaType
                             };
    fulfillWithResult(result, error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(imageContentForMinWidth:(NSString*)pth minWidth:(NSInteger)minWidth resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.files imageContentForMinWidth:pth minWidth:minWidth completion:^(NSData * _Nullable data, NSString * _Nullable mediaType, NSError * _Nonnull error) {
    NSDictionary *result = @{
                             @"data" : [data base64EncodedStringWithOptions:0],
                             @"mediaType" : mediaType
                             };
    fulfillWithResult(result, error, resolve, reject);
  }];
}

@end

@implementation RCTBridge (FilesBridge)

- (FilesBridge *)filesBridge {
  return [self moduleForClass:[FilesBridge class]];
}

@end
