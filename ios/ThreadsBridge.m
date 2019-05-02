#import "ThreadsBridge.h"

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

@interface ThreadsBridge ()

@property (atomic, strong) MobileSearchHandle *searchHandle;

@end

@implementation ThreadsBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(add:(NSString*)configStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *configData = [[NSData alloc] initWithBase64EncodedString:configStr options:0];
  AddThreadConfig *config = [[AddThreadConfig alloc] initWithData:configData error:&error];
  Thread *thread = [Textile.instance.threads add:config error:&error];
  fulfillWithResult([thread.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(addOrUpdate:(NSString*)threadStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *threadData = [[NSData alloc] initWithBase64EncodedString:threadStr options:0];
  Thread *thread = [[Thread alloc] initWithData:threadData error:&error];
  [Textile.instance.threads addOrUpdate:thread error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(rename:(NSString*)threadId name:(NSString*)name resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.threads rename:threadId name:name error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(get:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Thread *thread = [Textile.instance.threads get:threadId error:&error];
  fulfillWithResult([thread.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(list:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  ThreadList *list = [Textile.instance.threads list:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(peers:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  ContactList *list = [Textile.instance.threads peers:threadId error:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(remove:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [Textile.instance.threads remove:id_ error:&error];
  fulfillWithResult(result, error, resolve, reject);
}

RCT_EXPORT_METHOD(snapshot:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.threads snapshot:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(searchSnapshots:(NSString*)queryStr options:(NSString*)optionsStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }
  NSError *error;
  NSData *queryData = [[NSData alloc] initWithBase64EncodedString:queryStr options:0];
  ThreadSnapshotQuery *query = [[ThreadSnapshotQuery alloc] initWithData:queryData error:&error];
  NSData *optionsData = [[NSData alloc] initWithBase64EncodedString:optionsStr options:0];
  QueryOptions *options = [[QueryOptions alloc] initWithData:optionsData error:&error];
  self.searchHandle = [Textile.instance.threads searchSnapshots:query options:options error:&error];
  fulfillWithResult(self.searchHandle.id_, error, resolve, reject);
}

RCT_EXPORT_METHOD(cancelSearchSnapshots:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }
  resolve(nil);
}

@end

@implementation RCTBridge (ThreadsBridge)

- (ThreadsBridge *)threadsBridge {
  return [self moduleForClass:[ThreadsBridge class]];
}

@end
