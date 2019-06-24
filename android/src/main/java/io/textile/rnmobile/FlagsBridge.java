package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.textile.Textile;

public class FlagsBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public FlagsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FlagsBridge";
    }

    @ReactMethod
    public void add(final String blockId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().flags.add(blockId));
                }
                catch (final Exception e) {
                    promise.reject("add", e);
                }
            }
        });
    }
}
