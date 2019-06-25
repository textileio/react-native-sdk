package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.pb.View;
import io.textile.textile.Handlers;
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
                    final Model.Peer peer = Textile.instance().profile.get();
                    promise.resolve(Util.encode(peer.toByteArray()));
                }
                catch (final Exception e) {
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
                catch (final Exception e) {
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
                catch (final Exception e) {
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
                catch (final Exception e) {
                    promise.reject("avatar", e);
                }
            }
        });
    }

    @ReactMethod
    public void setAvatar(final String file, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().profile.setAvatar(file, new Handlers.BlockHandler() {
                    @Override
                    public void onComplete(final Model.Block block) {
                        promise.resolve(Util.encode(block.toByteArray()));
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("setAvatar", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void accountThread(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final Model.Thread thread = Textile.instance().profile.accountThread();
                    promise.resolve(Util.encode(thread.toByteArray()));
                } catch (final Exception e) {
                    promise.reject("accountThread", e);
                }
            }
        });
    }
}
