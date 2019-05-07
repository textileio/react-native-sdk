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

RCT_EXPORT_METHOD(prepare:(NSString*)strBase64 threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.files prepare:strBase64 threadId:threadId completion:^(MobilePreparedFiles * _Nullable preparedFiles, NSError * _Nonnull error) {
    fulfillWithResult([preparedFiles.data base64EncodedStringWithOptions:0], error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(prepareSync:(NSString*)strBase64 threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  MobilePreparedFiles *preparedFiles = [Textile.instance.files prepareSync:strBase64 threadId:threadId error:&error];
  fulfillWithResult([preparedFiles.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(prepareByPath:(NSString*)path threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [Textile.instance.files prepareByPath:path threadId:threadId completion:^(MobilePreparedFiles * _Nullable preparedFiles, NSError * _Nonnull error) {
    fulfillWithResult([preparedFiles.data base64EncodedStringWithOptions:0], error, resolve, reject);
  }];
}

RCT_EXPORT_METHOD(prepareByPathSync:(NSString*)path threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  MobilePreparedFiles *preparedFiles = [Textile.instance.files prepareByPathSync:path threadId:threadId error:&error];
  fulfillWithResult([preparedFiles.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(add:(NSString*)dirStr threadId:(NSString*)threadId caption:(NSString*)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *dirData = [[NSData alloc] initWithBase64EncodedString:dirStr options:0];
  Directory *dir = [[Directory alloc] initWithData:dirData error:&error];
  Block *block = [Textile.instance.files add:dir threadId:threadId caption:caption error:&error];
  fulfillWithResult([block.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(addByTarget:(NSString*)target threadId:(NSString*)threadId caption:(NSString*)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Block *block = [Textile.instance.files addByTarget:target threadId:threadId caption:caption error:&error];
  fulfillWithResult([block.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(list:(NSString*)threadId offset:(NSString*)offset limit:(NSInteger)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  FilesList *list = [Textile.instance.files list:threadId offset:offset limit:limit error:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(data:(NSString*)hash resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [Textile.instance.files data:hash error:&error];
  fulfillWithResult(result, error, resolve, reject);
}

RCT_EXPORT_METHOD(imageDataForMinWidth:(NSString*)pth minWidth:(NSInteger)minWidth resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [Textile.instance.files imageDataForMinWidth:pth minWidth:minWidth error:&error];
  fulfillWithResult(result, error, resolve, reject);
}

@end

@implementation RCTBridge (FilesBridge)

- (FilesBridge *)filesBridge {
  return [self moduleForClass:[FilesBridge class]];
}

@end
