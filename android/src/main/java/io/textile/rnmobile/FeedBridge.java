package io.textile.rnmobile;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.View;
import io.textile.textile.FeedItemData;
import io.textile.textile.Textile;

public class FeedBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public FeedBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FeedBridge";
    }

    @ReactMethod
    public void list(final String reqStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final View.FeedRequest request = View.FeedRequest.parseFrom(Util.decode(reqStr));
                    final List<FeedItemData> list = Textile.instance().feed.list(request);
                    final WritableArray converted = Arguments.createArray();
                    for (final FeedItemData feedItemData : list) {
                        final WritableMap map = Arguments.createMap();
                        map.putString("block", feedItemData.block);
                        map.putInt("type", feedItemData.type.ordinal());
                        map.putString("data", Util.feedItemDataToBase64(feedItemData));
                        converted.pushMap(map);
                    }
                    promise.resolve(converted);
                }
                catch (final Exception e) {
                    promise.reject("list", e);
                }
            }
        });
    }
}
