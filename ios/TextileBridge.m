#import "TextileBridge.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#import <Textile/TextileApi.h>
#import "TextileEvents.h"
#import "utils.h"

#define SYSTEM_VERSION_LESS_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)

@implementation TextileBridge

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (void)invalidate {
  dispatch_semaphore_t sema = dispatch_semaphore_create(0);
  dispatch_async([self methodQueue], ^{
    [Textile.instance destroyWithCompletion:^(BOOL success, NSError *error){
      dispatch_semaphore_signal(sema);
    }];
  });
  dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
}

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_METHOD(newWallet:(NSInteger)wordCount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *phrase = [Textile newWallet:wordCount error:&error];
  fulfillWithResult(phrase, error, resolve, reject);
}

RCT_EXPORT_METHOD(walletAccountAt:(NSString *)phrase index:(NSInteger)index password:(NSString *)password resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  MobileWalletAccount *account = [Textile walletAccountAt:phrase index:index password:password error:&error];
  fulfillWithResult([account.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

RCT_EXPORT_METHOD(isInitialized:(NSString *)repoPath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  BOOL initialized = [Textile isInitialized:repoPath];
  fulfillWithResult(@(initialized), nil, resolve, reject);
}

RCT_EXPORT_METHOD(initialize:(NSString *)repoPath seed:(NSString *)seed debug:(BOOL)debug logToDisk:(BOOL)logToDisk resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [Textile initialize:repoPath seed:seed debug:debug logToDisk:logToDisk error:&error];
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(initializeCreatingNewWalletAndAccount:(NSString *)repoPath debug:(BOOL)debug logToDisk:(BOOL)logToDisk resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *phrase = [Textile initializeCreatingNewWalletAndAccount:repoPath debug:debug logToDisk:logToDisk error:&error];
  fulfillWithResult(phrase, error, resolve, reject);
}

RCT_EXPORT_METHOD(launch:(NSString *)repoPath debug:(BOOL)debug resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  BOOL success = [Textile launch:repoPath debug:debug error:&error];
  if (success) {
    TextileEvents *eventHandler = self.bridge.textileEvents;
    Textile.instance.delegate = eventHandler;
  }
  fulfillWithResult(nil, error, resolve, reject);
}

RCT_EXPORT_METHOD(version:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(Textile.instance.version);
}

RCT_EXPORT_METHOD(gitSummary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(Textile.instance.gitSummary);
}

RCT_EXPORT_METHOD(summary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  Summary *summary = [Textile.instance summary:&error];
  fulfillWithResult([summary.data base64EncodedStringWithOptions:0], error, resolve, reject);
}

@end

@implementation RCTBridge (TextileBridge)

- (TextileBridge *)textileBridge {
  return [self moduleForClass:[TextileBridge class]];
}

@end
