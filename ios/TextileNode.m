//  Created by react-native-create-bridge

#import "TextileNode.h"
#import "Events.h"
#import <Mobile/Mobile.h>

// import RCTBridge
#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h” // Required when used as a Pod in a Swift project
#endif

#define SYSTEM_VERSION_LESS_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)

@interface Callback : NSObject<MobileCallback>
@end

@interface Callback()
@property (nonatomic, copy, nonnull) void (^completion)(NSData*, NSError*);
@end

@implementation Callback

- (instancetype)initWithCompletion:(void (^)(NSData*, NSError*))completion {
  self = [super init];
  if (self) {
    self.completion = completion;
  }
  return self;
}

- (void)call:(NSData *)payload err:(NSError *)err {
  self.completion(payload, err);
}

@end

@interface Messenger : NSObject<MobileMessenger>
// Define class properties here with @property
@end

@interface Messenger()

@end

@implementation Messenger

- (void) notify: (MobileEvent *)event {
  [Events emitEventWithName:event.name andPayload:event.payload];
}

@end

@interface TextileNode()

@property (nonatomic, strong) MobileMobile *node;
@property (readwrite, strong) MobileCancelFn *cancelContactsSearch;

@end

@implementation TextileNode

// Export a native module
// https://facebook.github.io/react-native/docs/native-modules-ios.html
RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

// Export methods to a native module
// https://facebook.github.io/react-native/docs/native-modules-ios.html

RCT_EXPORT_METHOD(acceptExternalInvite:(NSString*)id_ key:(NSString*)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node acceptExternalInvite:id_ key:key error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(acceptInviteViaNotification:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node acceptInviteViaNotification:id_ error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addContact:(NSString*)contactJsonString resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node addContact:contactJsonString error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addExternalInvite:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addExternalInvite:threadId error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addSchema:(NSString*)jsonstr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addSchema:jsonstr error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addThread:(NSString*)key name:(NSString*)name type:(NSString*)type sharing:(NSString*)sharing members:(NSString*)members schema:(NSString*)schema media:(BOOL)media  cameraRoll:(BOOL)cameraRoll resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  MobileAddThreadConfig *config = [[MobileAddThreadConfig alloc] init];
  config.key = key;
  config.name = name;
  config.type = type;
  config.sharing = sharing;
  config.members = members;
  config.schema = schema;
  config.media = media;
  config.cameraRoll = cameraRoll;
  NSError *error;
  NSString *result = [self.node addThread:config error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addComment:(NSString*)blockId body:(NSString*)body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addComment:blockId body:body error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addFiles:(NSString*)dir threadId:(NSString*)threadId caption:(NSString*)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *data = [[NSData alloc] initWithBase64EncodedString:dir options:0];
  NSString *result = [self.node addFiles:data threadId:threadId caption:caption error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addFilesByTarget:(NSString*)target threadId:(NSString*)threadId caption:(NSString*)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addFilesByTarget:target threadId:threadId caption:caption error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addIgnore:(NSString*)blockId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addIgnore:blockId error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addInvite:(NSString*)threadId inviteeId:(NSString*)inviteeId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addInvite:threadId inviteeId:inviteeId error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addLike:(NSString*)blockId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addLike:blockId error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addMessage:(NSString*)threadId body:(NSString*)body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addMessage:threadId body:body error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(address:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *result = self.node.address;
  resolve(result);
}

RCT_EXPORT_METHOD(avatar:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node avatar:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(cafeSession:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node cafeSession:peerId error:&error];
  NSString *base64 = [result base64EncodedStringWithOptions:0];
  [self fulfillWithResult:base64 error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(cafeSessions:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node cafeSessions:&error];
  NSString *base64 = [result base64EncodedStringWithOptions:0];
  [self fulfillWithResult:base64 error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(checkCafeMessages:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node checkCafeMessages:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(contact:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node contact:id_ error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(contactThreads:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node contactThreads:id_ error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(contacts:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node contacts:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(countUnreadNotifications:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  long result = [self.node countUnreadNotifications];
  [self fulfillWithResult:[NSNumber numberWithLong:result] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(deregisterCafe:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node deregisterCafe:peerId error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(fileData:(NSString*)hash resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self _fileData:hash error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(ignoreInviteViaNotification:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node ignoreInviteViaNotification:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(imageFileDataForMinWidth:(NSString*)pth minWidth:(NSInteger)minWidth resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self _imageFileDataForMinWidth:pth minWidth:minWidth error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(notifications:(NSString*)offset limit:(NSInteger)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node notifications:offset limit:limit error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(summary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node summary:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(peerId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node peerId:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(prepareFiles:(NSString*)path threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node prepareFiles:path threadId:threadId error:&error];
  NSString *base64 = [result base64EncodedStringWithOptions:0];
  [self fulfillWithResult:base64 error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(prepareFilesAsync:(NSString*)path threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [self.node prepareFilesAsync:path threadId:threadId cb:[[Callback alloc] initWithCompletion:^ (NSData *payload, NSError *error) {
    if (error) {
      reject(@(error.code).stringValue, error.localizedDescription, error);
    } else {
      NSString *base64 = [payload base64EncodedStringWithOptions:0];
      resolve(base64);
    }
  }]];
}

RCT_EXPORT_METHOD(profile:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node profile:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(readAllNotifications:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node readAllNotifications:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(readNotification:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node readNotification:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(refreshCafeSession:(NSString*)cafeId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node refreshCafeSession:cafeId error:&error];
  NSString *base64 = [result base64EncodedStringWithOptions:0];
  [self fulfillWithResult:base64 error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(registerCafe:(NSString*)peerId token:(NSString*)token resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node registerCafe:peerId token:token error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeContact:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node removeContact:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeThread:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node removeThread:id_ error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(searchContacts:(NSString*)queryString options:(NSString*)optionsString) {
  NSData *query = [[NSData alloc] initWithBase64EncodedString:queryString options:0];
  NSData *options = [[NSData alloc] initWithBase64EncodedString:optionsString options:0];

  if (self.cancelContactsSearch) {
    [self.cancelContactsSearch call];
    self.cancelContactsSearch = nil;
  }

  MobileCancelFn *newCancellable = [self.node searchContacts:query options:options cb:[[Callback alloc] initWithCompletion:^ (NSData *payload, NSError *error) {
    if (error) {
      NSString *jsonString = [NSString stringWithFormat:@"{\"message\":\"%@\"}", error.localizedDescription];
      [Events emitEventWithName:@"@textile/sdk/searchContactsError" andPayload:jsonString];
    } else {
      NSString *base64 = [payload base64EncodedStringWithOptions:0];
      NSString *jsonString = [NSString stringWithFormat:@"{\"buffer\":\"%@\"}", base64];
      [Events emitEventWithName:@"@textile/sdk/searchContactsResult" andPayload:jsonString];
    }
  }] error:nil];
  self.cancelContactsSearch = newCancellable;
}

RCT_EXPORT_METHOD(cancelSearchContacts:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  @try {
    if (self.cancelContactsSearch) {
      [self.cancelContactsSearch call];
      self.cancelContactsSearch = nil;
    }
    resolve(@"success");
  }
  @catch (NSException *exception) {
    NSError *error;
    reject(exception.name, exception.reason, error);
  }
}

RCT_EXPORT_METHOD(seed:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *result = self.node.seed;
  resolve(result);
}

RCT_EXPORT_METHOD(setAvatar:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node setAvatar:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setLogLevels:(NSString*)levels resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node setLogLevels:levels error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setUsername:(NSString*)username resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node setUsername:username error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(start:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node start:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(stop:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node stop:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(feed:(NSString*)offset limit:(NSInteger)limit mode:(NSInteger*)mode threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  int32_t m = mode ? (int32_t) mode : 0;
  NSData *result = [self.node feed:offset limit:limit threadId:threadId mode:m error:&error];
  NSString *base64 = [result base64EncodedStringWithOptions:0];
  [self fulfillWithResult:base64 error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(files:(NSString*)offset limit:(NSInteger)limit threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node files:offset limit:limit threadId:threadId error:&error];
  NSString *base64 = [result base64EncodedStringWithOptions:0];
  [self fulfillWithResult:base64 error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(messages:(NSString*)offset limit:(NSInteger)limit threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node messages:offset limit:limit threadId:threadId error:&error];
  NSString *base64 = [result base64EncodedStringWithOptions:0];
  [self fulfillWithResult:base64 error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(threadInfo:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node threadInfo:threadId error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(threads:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node threads:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(username:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node username:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(version:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *result = [self.node version];
  [self fulfillWithResult:result error:nil resolver:resolve rejecter:reject];
}

// Order of things to init and create the repo:
// MobileNewTextile If error, inspect it and run next steps or migration
// MobileNewWallet returns recovery phrase
// MobileWalletAccountAt returns seed and address
// MobileInitRepo only run one time ever
// MobileNewTextile

RCT_EXPORT_METHOD(initRepo:(NSString*)seed repoPath:(NSString*)repoPath logToDisk:(BOOL)logToDisk debug:(BOOL)debug resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  MobileInitConfig *config = [[MobileInitConfig alloc] init];
  config.seed = seed;
  config.repoPath = repoPath;
  config.logToDisk = logToDisk;
  config.debug = debug;
  NSError *error;
  MobileInitRepo(config, &error); // only run one time ever
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(migrateRepo:(NSString*)repoPath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  MobileMigrateConfig *config = [[MobileMigrateConfig alloc] init];
  config.repoPath = repoPath;
  NSError *error;
  MobileMigrateRepo(config, &error);
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(newTextile:(NSString*)repoPath debug:(BOOL)debug resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  if (!self.node) {
    MobileRunConfig *config = [[MobileRunConfig alloc] init];
    config.repoPath = repoPath;
    config.debug = debug;
    self.node = MobileNewTextile(config, [[Messenger alloc] init], &error); // Returns the 'needs migration error'
  }
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(newWallet:(NSInteger)wordCount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = MobileNewWallet(wordCount, &error); // returns recovery phrase
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(walletAccountAt:(NSString*)phrase index:(NSInteger)index password:(NSString*)password resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *p = password ? password : @"";
  NSError *error;
  NSString *result = MobileWalletAccountAt(phrase, index, p, &error); // return seed and address
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

- (void)fulfillWithResult:(id)result error:(NSError*)error resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  if (!error) {
    resolve(result);
  } else {
    reject(@(error.code).stringValue, error.localizedDescription, error);
  }
}

// Couple methods that need to be available from RN and within Obj C

- (NSString*)_fileData:(NSString*)hash error:(NSError**)error {
  NSString *result = [self.node fileData:hash error:error];
  // TODO: Parse this json string into a dictionary and pull base64 data from it
  return result;
}

- (NSString*)_imageFileDataForMinWidth:(NSString*)pth minWidth:(long)minWidth error:(NSError**)error {
  NSString *result = [self.node imageFileDataForMinWidth:pth minWidth:minWidth error:error];
  // TODO: Parse this json string into a dictionary and pull base64 data from it
  return result;
}

@end

@implementation RCTBridge (TextileNode)

- (TextileNode *)textileNode
{
  return [self moduleForClass:[TextileNode class]];
}

@end
