package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.textile.Textile;

public class SchemasBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public SchemasBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SchemasBridge";
    }

    @ReactMethod
    public void add(final String nodeStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final Model.Node node = Model.Node.parseFrom(Util.decode(nodeStr));
                    final Model.FileIndex index = Textile.instance().schemas.add(node);
                    promise.resolve(Util.encode(index.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("add", e);
                }
            }
        });
    }
}
