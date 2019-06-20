#import "utils.h"
#import <Textile/TextileApi.h>

void fulfillWithResult(id result, NSError *error, RCTPromiseResolveBlock resolve, RCTPromiseRejectBlock reject) {
  if (!error) {
    resolve(result);
  } else {
    reject(@(error.code).stringValue, error.localizedDescription, error);
  }
}

NSString * feedItemDataToBase64(FeedItemData *feedItemData) {
  NSString *data;
  switch (feedItemData.type) {
    case FeedItemTypeText:
      data = [feedItemData.text.data base64EncodedStringWithOptions:0];
      break;
    case FeedItemTypeComment:
      data = [feedItemData.comment.data base64EncodedStringWithOptions:0];
      break;
    case FeedItemTypeLike:
      data = [feedItemData.like.data base64EncodedStringWithOptions:0];
      break;
    case FeedItemTypeFiles:
      data = [feedItemData.files.data base64EncodedStringWithOptions:0];
      break;
    case FeedItemTypeIgnore:
      data = [feedItemData.ignore.data base64EncodedStringWithOptions:0];
      break;
    case FeedItemTypeJoin:
      data = [feedItemData.join.data base64EncodedStringWithOptions:0];
      break;
    case FeedItemTypeLeave:
      data = [feedItemData.leave.data base64EncodedStringWithOptions:0];
      break;
  }
  return data;
}
