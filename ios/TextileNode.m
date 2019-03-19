#import "TextileNode.h"
#import "Events.h"
#import <Mobile/Mobile.h>

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
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
@end

@interface Messenger()

@end

@implementation Messenger

- (void) notify: (MobileEvent *)event {
  NSString *payload = [event.data base64EncodedStringWithOptions:0];
  [Events emitEventWithName:event.name andPayload:payload];
}

@end


@interface TextileNode()

@property (nonatomic, strong) MobileMobile *node;
@property (readwrite, strong) MobileSearchHandle *searchHandle;

@end

@implementation TextileNode

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_queue_create("io.textile.TextileNodeQueue", DISPATCH_QUEUE_SERIAL);
}

- (void)fulfillWithResult:(id)result nilDefault:(id)nilDefault error:(NSError*)error resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  if (!error) {
    if (result != nil) {
      resolve(result);
    } else {
      resolve(nilDefault);
    }
  } else {
    reject(@(error.code).stringValue, error.localizedDescription, error);
  }
}

- (void)fulfillWithResult:(id)result error:(NSError*)error resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  if (!error) {
    resolve(result);
  } else {
    reject(@(error.code).stringValue, error.localizedDescription, error);
  }
}


#pragma mark - Account ---------------->

RCT_EXPORT_METHOD(address:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(self.node.address);
}

RCT_EXPORT_METHOD(seed:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(self.node.seed);
}

RCT_EXPORT_METHOD(encrypt:(NSString*)inputStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node encrypt:[[NSData alloc]initWithBase64EncodedString:inputStr options:0] error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(decrypt:(NSString*)inputStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node decrypt:[[NSData alloc]initWithBase64EncodedString:inputStr options:0] error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(accountPeers:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node accountPeers:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(findThreadBackups:(NSString*)queryStr options:(NSString*)optionsStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }

  NSData *query = [[NSData alloc] initWithBase64EncodedString:queryStr options:0];
  NSData *options = [[NSData alloc] initWithBase64EncodedString:optionsStr options:0];
  NSError *error;
  self.searchHandle = [self.node findThreadBackups:query options:options error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}


#pragma mark - Cafes ---------------->

RCT_EXPORT_METHOD(registerCafe:(NSString*)peerId token:(NSString*)token resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node registerCafe:peerId token:token error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(cafeSession:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node cafeSession:peerId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(cafeSessions:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node cafeSessions:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(refreshCafeSession:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node refreshCafeSession:peerId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(deregisterCafe:(NSString*)peerId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node deregisterCafe:peerId error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(checkCafeMessages:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node checkCafeMessages:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}


#pragma mark - Comments ---------------->

RCT_EXPORT_METHOD(addComment:(NSString*)blockId body:(NSString*)body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addComment:blockId body:body error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}


#pragma mark - Contacts ---------------->

RCT_EXPORT_METHOD(addContact:(NSString*)contactStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node addContact:[[NSData alloc] initWithBase64EncodedString:contactStr options:0] error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(contact:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node contact:id_ error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(contacts:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node contacts:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeContact:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node removeContact:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(contactThreads:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node contactThreads:id_ error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(searchContacts:(NSString*)queryStr options:(NSString*)optionsStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (self.searchHandle) {
    [self.searchHandle cancel];
    self.searchHandle = nil;
  }

  NSError *error;
  NSData *query = [[NSData alloc] initWithBase64EncodedString:queryStr options:0];
  NSData *options = [[NSData alloc] initWithBase64EncodedString:optionsStr options:0];
  self.searchHandle = [self.node searchContacts:query options:options error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}


#pragma mark - Feed ---------------->

RCT_EXPORT_METHOD(feed:(NSString*)reqStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node feed:[[NSData alloc] initWithBase64EncodedString:reqStr options:0] error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}


#pragma mark - Files ---------------->

RCT_EXPORT_METHOD(prepareFiles:(NSString*)strBase64 threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {

  // NSData *fileData = [[NSData alloc] initWithBase64EncodedString:dataStr options:0];

  [self.node prepareFiles:strBase64 threadId:threadId cb:[[Callback alloc] initWithCompletion:^ (NSData *data, NSError *error) {
    if (error) {
      reject(@(error.code).stringValue, error.localizedDescription, error);
    } else {
      resolve([data base64EncodedStringWithOptions:0]);
    }
  }]];
}

RCT_EXPORT_METHOD(prepareFilesSync:(NSString*)strBase64 threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  // NSData *fileData = [[NSData alloc] initWithBase64EncodedString:dataStr options:0];
  NSData *result = [self.node prepareFilesSync:strBase64 threadId:threadId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(prepareFilesByPath:(NSString*)path threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [self.node prepareFilesByPath:path threadId:threadId cb:[[Callback alloc] initWithCompletion:^ (NSData *data, NSError *error) {
    if (error) {
      reject(@(error.code).stringValue, error.localizedDescription, error);
    } else {
      resolve([data base64EncodedStringWithOptions:0]);
    }
  }]];
}

RCT_EXPORT_METHOD(prepareFilesByPathSync:(NSString*)path threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node prepareFilesByPathSync:path threadId:threadId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addFiles:(NSString*)dirStr threadId:(NSString*)threadId caption:(NSString*)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *dir = [[NSData alloc] initWithBase64EncodedString:dirStr options:0];
  NSData *result = [self.node addFiles:dir threadId:threadId caption:caption error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addFilesByTarget:(NSString*)target threadId:(NSString*)threadId caption:(NSString*)caption resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node addFilesByTarget:target threadId:threadId caption:caption error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(files:(NSString*)offset limit:(NSInteger)limit threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node files:offset limit:limit threadId:threadId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(fileData:(NSString*)hash resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self _fileData:hash error:&error] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(imageFileDataForMinWidth:(NSString*)pth minWidth:(NSInteger)minWidth resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self _imageFileDataForMinWidth:pth minWidth:minWidth error:&error] error:error resolver:resolve rejecter:reject];
}


#pragma mark - Flags ---------------->

RCT_EXPORT_METHOD(addFlag:(NSString*)blockId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node addFlag:blockId error:&error] error:error resolver:resolve rejecter:reject];
}


#pragma mark - Ignores ---------------->

RCT_EXPORT_METHOD(addIgnore:(NSString*)blockId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node addIgnore:blockId error:&error] error:error resolver:resolve rejecter:reject];
}


#pragma mark - Invites ---------------->

RCT_EXPORT_METHOD(addInvite:(NSString*)threadId inviteeId:(NSString*)inviteeId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node addInvite:threadId inviteeId:inviteeId error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addExternalInvite:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node addExternalInvite:threadId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(acceptExternalInvite:(NSString*)id_ key:(NSString*)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = [self.node acceptExternalInvite:id_ key:key error:&error];
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}


#pragma mark - Ipfs ---------------->

RCT_EXPORT_METHOD(peerId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node peerId:&error] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(dataAtPath:(NSString*)pth resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node dataAtPath:pth error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}


#pragma mark - Likes ---------------->

RCT_EXPORT_METHOD(addLike:(NSString*)blockId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node addLike:blockId error:&error] error:error resolver:resolve rejecter:reject];
}


#pragma mark - Logs ---------------->

RCT_EXPORT_METHOD(setLogLevels:(NSString*)levelStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node setLogLevel:[[NSData alloc] initWithBase64EncodedString:levelStr options:0] error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}


#pragma mark - Messages ---------------->

RCT_EXPORT_METHOD(addMessage:(NSString*)threadId body:(NSString*)body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node addMessage:threadId body:body error:&error] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(messages:(NSString*)offset limit:(NSInteger)limit threadId:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node messages:offset limit:limit threadId:threadId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}


#pragma mark - Notifications ---------------->

RCT_EXPORT_METHOD(notifications:(NSString*)offset limit:(NSInteger)limit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node notifications:offset limit:limit error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(countUnreadNotifications:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  long result = [self.node countUnreadNotifications];
  [self fulfillWithResult:[NSNumber numberWithLong:result] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(readNotification:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node readNotification:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(readAllNotifications:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node readAllNotifications:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(acceptInviteViaNotification:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node acceptInviteViaNotification:id_ error:&error] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(ignoreInviteViaNotification:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node ignoreInviteViaNotification:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}


#pragma mark - Profile ---------------->

RCT_EXPORT_METHOD(profile:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node profile:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(username:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node username:&error] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setUsername:(NSString*)username resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node setUsername:username error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(avatar:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node avatar:&error] error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setAvatar:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node setAvatar:id_ error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}


#pragma mark - Schemas ---------------->

RCT_EXPORT_METHOD(addSchema:(NSString*)nodeStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node addSchema:[[NSData alloc] initWithBase64EncodedString:nodeStr options:0] error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}


#pragma mark - Threads ---------------->

RCT_EXPORT_METHOD(addThread:(NSString*)configStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *config = [[NSData alloc] initWithBase64EncodedString:configStr options:0];
  NSData *result = [self.node addThread:config error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addOrUpdateThread:(NSString*)threadStr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *thread = [[NSData alloc] initWithBase64EncodedString:threadStr options:0];
  [self.node addOrUpdateThread:thread error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(rename:(NSString*)threadId name:(NSString*)name resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self.node renameThread:threadId name:name error:&error];
  [self fulfillWithResult:nil error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(thread:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node thread:threadId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(threads:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node threads:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(peers:(NSString*)threadId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node threadPeers:threadId error:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeThread:(NSString*)id_ resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  [self fulfillWithResult:[self.node removeThread:id_ error:&error] error:error resolver:resolve rejecter:reject];
}


#pragma mark - Mobile ---------------->

RCT_EXPORT_METHOD(newWallet:(NSInteger)wordCount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSString *result = MobileNewWallet(wordCount, &error); // returns recovery phrase
  [self fulfillWithResult:result error:error resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(walletAccountAt:(NSString*)phrase index:(NSInteger)index password:(NSString*)password resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *p = password ? password : @"";
  NSError *error;
  NSData *result = MobileWalletAccountAt(phrase, index, p, &error); // return seed and address
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] nilDefault:@"" error:error resolver:resolve rejecter:reject];
}

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

RCT_EXPORT_METHOD(version:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [self fulfillWithResult:[self.node version] error:nil resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(gitSummary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [self fulfillWithResult:[self.node gitSummary] error:nil resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(summary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  NSData *result = [self.node summary:&error];
  [self fulfillWithResult:[result base64EncodedStringWithOptions:0] error:error resolver:resolve rejecter:reject];
}


#pragma mark - Helpers ---------------->

RCT_EXPORT_METHOD(cancelSearch:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  @try {
    if (self.searchHandle) {
      [self.searchHandle cancel];
      self.searchHandle = nil;
    }
    resolve(@"success");
  }
  @catch (NSException *exception) {
    NSError *error;
    reject(exception.name, exception.reason, error);
  }
}


// Couple methods that need to be available from RN and within Obj C

- (NSString*)_fileData:(NSString*)hash error:(NSError**)error {
  return [self.node fileData:hash error:error];
}

- (NSString*)_imageFileDataForMinWidth:(NSString*)pth minWidth:(long)minWidth error:(NSError**)error {
  return [self.node imageFileDataForMinWidth:pth minWidth:minWidth error:error];
}

@end

@implementation RCTBridge (TextileNode)

- (TextileNode *)textileNode
{
  return [self moduleForClass:[TextileNode class]];
}

@end
