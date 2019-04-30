package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

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
    public void initialize(final Boolean debug, final Boolean logToDisk, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String phrase = Textile.initialize(context, debug, logToDisk);
                    DeviceEventManagerModule.RCTDeviceEventEmitter emitter = context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
                    Textile.instance().addEventListener(new TextileEvents(emitter));
                    promise.resolve(phrase);
                } catch (Exception e) {
                    promise.reject("initialize", e);
                }
            }
        });
    }

    @ReactMethod
    public void repoPath(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Textile.instance().repoPath);
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
                catch (Exception e) {
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
                catch (Exception e) {
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
                    View.Summary summary = Textile.instance().summary();
                    promise.resolve(Util.encode(summary.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("summary", e);
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
                } catch (Exception e) {
                }
            }
        });
    }
}
