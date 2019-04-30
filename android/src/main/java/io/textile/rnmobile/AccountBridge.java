package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.pb.QueryOuterClass;
import io.textile.textile.Textile;
import mobile.SearchHandle;

public class AccountBridge extends ReactContextBaseJavaModule {

    private static SearchHandle searchHandle;

    private Executor executor = Executors.newSingleThreadExecutor();

    public AccountBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AccountBridge";
    }

    @ReactMethod
    public void address(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().account.address());
                }
                catch (Exception e) {
                    promise.reject("address", e);
                }
            }
        });
    }

    @ReactMethod
    public void seed(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().account.seed());
                }
                catch (Exception e) {
                    promise.reject("seed", e);
                }
            }
        });
    }

    @ReactMethod
    public void encrypt(final String inputStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Util.encode(Textile.instance().account.encrypt(Util.decode(inputStr))));
                }
                catch (Exception e) {
                    promise.reject("encrypt", e);
                }
            }
        });
    }

    @ReactMethod
    public void decrypt(final String inputStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Util.encode(Textile.instance().account.decrypt(Util.decode(inputStr))));
                }
                catch (Exception e) {
                    promise.reject("decrypt", e);
                }
            }
        });
    }

    @ReactMethod
    public void contact(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.Contact contact = Textile.instance().account.contact();
                    promise.resolve(Util.encode(contact.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("contact", e);
                }
            }
        });
    }

    @ReactMethod
    public void sync(final String optionsStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (AccountBridge.searchHandle != null) {
                        AccountBridge.searchHandle.cancel();
                    }
                    QueryOuterClass.QueryOptions options = QueryOuterClass.QueryOptions.parseFrom(Util.decode(optionsStr));
                    AccountBridge.searchHandle = Textile.instance().account.sync(options);
                    promise.resolve(AccountBridge.searchHandle.getId());
                }
                catch (Exception e) {
                    promise.reject("syncAccount", e);
                }
            }
        });
    }

    @ReactMethod
    public void cancelSync(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (AccountBridge.searchHandle != null) {
                        AccountBridge.searchHandle.cancel();
                        AccountBridge.searchHandle = null;
                    }
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("cancelSync", e);
                }
            }
        });
    }
}
