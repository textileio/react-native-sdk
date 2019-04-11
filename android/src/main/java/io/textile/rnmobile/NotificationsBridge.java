package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.textile.Textile;

public class NotificationsBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public NotificationsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NotificationsBridge";
    }

    @ReactMethod
    public void list(final String offset, final Integer limit, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.NotificationList list = Textile.instance().notifications.list(offset, limit);
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("list", e);
                }
            }
        });
    }

    @ReactMethod
    public void countUnread(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().notifications.countUnread());
                }
                catch (Exception e) {
                    promise.reject("countUnread", e);
                }
            }
        });
    }

    @ReactMethod
    public void read(final String notificationId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().notifications.read(notificationId);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("read", e);
                }
            }
        });
    }

    @ReactMethod
    public void readAll(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().notifications.readAll();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("readAll", e);
                }
            }
        });
    }

    @ReactMethod
    public void acceptInvite(final String id, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().notifications.acceptInvite(id));
                }
                catch (Exception e) {
                    promise.reject("acceptInvite", e);
                }
            }
        });
    }

    @ReactMethod
    public void ignoreInvite(final String id, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().notifications.ignoreInvite(id);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("ignoreInvite", e);
                }
            }
        });
    }
}
