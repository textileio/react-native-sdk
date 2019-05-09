package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.pb.View;
import io.textile.textile.Textile;

public class ProfileBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public ProfileBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ProfileBridge";
    }

    @ReactMethod
    public void get(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.Peer peer = Textile.instance().profile.get();
                    promise.resolve(Util.encode(peer.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("get", e);
                }
            }
        });
    }

    @ReactMethod
    public void name(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().profile.name());
                }
                catch (Exception e) {
                    promise.reject("name", e);
                }
            }
        });
    }

    @ReactMethod
    public void setName(final String name, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().profile.setName(name);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("setName", e);
                }
            }
        });
    }

    @ReactMethod
    public void avatar(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().profile.avatar());
                }
                catch (Exception e) {
                    promise.reject("avatar", e);
                }
            }
        });
    }

    @ReactMethod
    public void accountThread(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.Thread thread = Textile.instance().profile.accountThread();
                    promise.resolve(Util.encode(thread.toByteArray()));
                } catch (Exception e) {
                    promise.reject("accountThread", e);
                }
            }
        });
    }
}
