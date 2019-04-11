package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.View;
import io.textile.textile.Textile;

public class InvitesBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public InvitesBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "InvitesBridge";
    }

    @ReactMethod
    public void add(final String threadId, final String address, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().invites.add(threadId, address);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("add", e);
                }
            }
        });
    }

    @ReactMethod
    public void addExternal(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    View.ExternalInvite invite = Textile.instance().invites.addExternal(threadId);
                    promise.resolve(Util.encode(invite.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("addExternal", e);
                }
            }
        });
    }

    @ReactMethod
    public void acceptExternal(final String inviteId, final String key, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().invites.acceptExternal(inviteId, key));
                }
                catch (Exception e) {
                    promise.reject("acceptExternal", e);
                }
            }
        });
    }
}
