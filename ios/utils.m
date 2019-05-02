#import "utils.h"

void fulfillWithResult(id result, NSError *error, RCTPromiseResolveBlock resolve, RCTPromiseRejectBlock reject) {
  if (!error) {
    resolve(result);
  } else {
    reject(@(error.code).stringValue, error.localizedDescription, error);
  }
}
