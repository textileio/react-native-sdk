package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.View;
import io.textile.textile.Textile;

public class MessagesBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public MessagesBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MessagesBridge";
    }

    @ReactMethod
    public void add(final String threadId, final String body, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().messages.add(threadId, body));
                }
                catch (final Exception e) {
                    promise.reject("add", e);
                }
            }
        });
    }

    @ReactMethod
    public void list(final String offset, final Integer limit, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final View.TextList list = Textile.instance().messages.list(offset, limit, threadId);
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("list", e);
                }
            }
        });
    }
}
