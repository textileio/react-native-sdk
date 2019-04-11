package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.View;
import io.textile.textile.Textile;

public class LogsBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public LogsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LogsBridge";
    }

    @ReactMethod
    public void setLevel(final String levelStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    View.LogLevel level = View.LogLevel.parseFrom(Util.decode(levelStr));
                    Textile.instance().logs.setLevel(level);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("setLevel", e);
                }
            }
        });
    }
}
