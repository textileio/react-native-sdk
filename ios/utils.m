#import "utils.h"

void fulfillWithResultAndNilDefault(id result, id nilDefault, NSError *error, RCTPromiseResolveBlock resolve, RCTPromiseRejectBlock reject) {
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

void fulfillWithResult(id result, NSError *error, RCTPromiseResolveBlock resolve, RCTPromiseRejectBlock reject) {
  if (!error) {
    resolve(result);
  } else {
    reject(@(error.code).stringValue, error.localizedDescription, error);
  }
}
