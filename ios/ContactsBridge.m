#import "ContactsBridge.h"

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

@interface ContactsBridge ()

@property (atomic, strong) MobileSearchHandle *searchHandle;

@end

@implementation ContactsBridge

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(add:(NSString*)contactStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *contactData = [[NSData alloc] initWithBase64EncodedString:contactStr options:0];
  Contact *contact = [[Contact alloc] initWithData:contactData error:&error];
  [Textile.instance.contacts add:contact error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(get:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Contact *contact = [Textile.instance.contacts get:id_ error:&error];
  fulfillWithResult([contact.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(list:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  ContactList *list = [Textile.instance.contacts list:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(remove:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile.instance.contacts remove:id_ error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(threads:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  ThreadList *list = [Textile.instance.contacts threads:id_ error:&error];
  fulfillWithResult([list.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(search:(NSString*)queryStr options:(NSString*)optionsStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }
  NSError *error;
  NSData *queryData = [[NSData alloc] initWithBase64EncodedString:queryStr options:0];
  ContactQuery *query = [[ContactQuery alloc] initWithData:queryData error:&error];
  NSData *optionsData = [[NSData alloc] initWithBase64EncodedString:optionsStr options:0];
  QueryOptions *options = [[QueryOptions alloc] initWithData:optionsData error:&error];
  self.searchHandle = [Textile.instance.contacts search:query options:options error:&error];
  fulfillWithResult(self.searchHandle.id_, error, resolve, reject);
}

RCT_EXPORT_METHOD(cancelSearch:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }
  resolve(nil);
}

@end

@implementation RCTBridge (ContactsBridge)

- (ContactsBridge *)contactsBridge {
  return [self moduleForClass:[ContactsBridge class]];
}

@end

