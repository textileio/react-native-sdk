package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.textile.Textile;

public class CommentsBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public CommentsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CommentsBridge";
    }

    @ReactMethod
    public void add(final String blockId, final String body, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().comments.add(blockId, body));
                }
                catch (final Exception e) {
                    promise.reject("addComment", e);
                }
            }
        });
    }
}
