package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Mobile;
import io.textile.pb.View;
import io.textile.textile.Textile;

public class TextileBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();
    private ReactApplicationContext context;

    public TextileBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "TextileBridge";
    }

    @ReactMethod
    public void newWallet(final long wordCount, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.newWallet(wordCount));
                } catch (final Exception e) {
                    promise.reject("newWallet", e);
                }
            }
        });
    }

    @ReactMethod
    public void walletAccountAt(final String phrase, final long index, final String password, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Mobile.MobileWalletAccount account = Textile.walletAccountAt(phrase, index, password);
                    promise.resolve(Util.encode(account.toByteArray()));
                } catch (final Exception e) {
                    promise.reject("walletAccountAt", e);
                }
            }
        });
    }

    @ReactMethod
    public void isInitialized(final String repoPath, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.isInitialized(repoPath));
                } catch (final Exception e) {
                    promise.reject("isInitialized", e);
                }
            }
        });
    }

    @ReactMethod
    public void initialize(final String repoPath, final String seed, final Boolean debug, final Boolean logToDisk, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.initialize(repoPath, seed, debug, logToDisk);
                    promise.resolve(null);
                } catch (final Exception e) {
                    promise.reject("initialize", e);
                }
            }
        });
    }

    @ReactMethod
    public void initializeCreatingNewWalletAndAccount(final String repoPath, final Boolean debug, final Boolean logToDisk, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.initializeCreatingNewWalletAndAccount(repoPath, debug, logToDisk));
                } catch (final Exception e) {
                    promise.reject("initializeCreatingNewWalletAndAccount", e);
                }
            }
        });
    }

    @ReactMethod
    public void launch(final String repoPath, final Boolean debug, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.launch(context, repoPath, debug);
                    DeviceEventManagerModule.RCTDeviceEventEmitter emitter =
                            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
                    Textile.instance().addEventListener(new TextileEvents(emitter));
                    promise.resolve(null);
                } catch (final Exception e) {
                    promise.reject("launch", e);
                }
            }
        });
    }

    @ReactMethod
    public void version(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().version());
                }
                catch (final Exception e) {
                    promise.reject("version", e);
                }
            }
        });
    }

    @ReactMethod
    public void gitSummary(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().gitSummary());
                }
                catch (final Exception e) {
                    promise.reject("gitSummary", e);
                }
            }
        });
    }

    @ReactMethod
    public void summary(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final View.Summary summary = Textile.instance().summary();
                    promise.resolve(Util.encode(summary.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("summary", e);
                }
            }
        });
    }

    @ReactMethod
    public void online(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().online());
                }
                catch (final Exception e) {
                    promise.reject("online", e);
                }
            }
        });
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().destroy();
                } catch (final Exception e) {
                    // noop
                }
            }
        });
    }
}
