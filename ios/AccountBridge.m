#import "AccountBridge.h"

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

@interface AccountBridge ()

@property (atomic, strong) MobileSearchHandle *searchHandle;

@end

@implementation AccountBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(address:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(Textile.instance.account.address);
}

RCT_EXPORT_METHOD(seed:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(Textile.instance.account.seed);
}

RCT_EXPORT_METHOD(encrypt:(NSString*)inputStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *data = [Textile.instance.account encrypt:[[NSData alloc] initWithBase64EncodedString:inputStr options:0] error:&error];
  fulfillWithResultAndNilDefault([data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
}

RCT_EXPORT_METHOD(decrypt:(NSString*)inputStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *data = [Textile.instance.account decrypt:[[NSData alloc]initWithBase64EncodedString:inputStr options:0] error:&error];
  fulfillWithResultAndNilDefault([data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
}

RCT_EXPORT_METHOD(contact:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Contact *contact = [Textile.instance.account contact:&error];
  fulfillWithResultAndNilDefault([contact.data base64EncodedStringWithOptions:0], @"", error, resolve, reject);
}

RCT_EXPORT_METHOD(sync:(NSString*)optionsStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }
  NSError *error;
  NSData *optionsData = [[NSData alloc] initWithBase64EncodedString:optionsStr options:0];
  QueryOptions *options = [[QueryOptions alloc] initWithData:optionsData error:&error];
  self.searchHandle = [Textile.instance.account sync:options error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(cancelSync:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }
  resolve(@"success");
}

@end

@implementation RCTBridge (AccountBridge)

- (AccountBridge *)accountBridge {
  return [self moduleForClass:[AccountBridge class]];
}

@end

