package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.textile.Textile;

public class CafesBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public CafesBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CafesBridge";
    }

    @ReactMethod
    public void register(final String host, final String token, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().cafes.register(host, token);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("register", e);
                }
            }
        });
    }

    @ReactMethod
    public void session(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.CafeSession session = Textile.instance().cafes.session(peerId);
                    promise.resolve(Util.encode(session.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("session", e);
                }
            }
        });
    }

    @ReactMethod
    public void sessions(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.CafeSessionList list = Textile.instance().cafes.sessions();
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("sessions", e);
                }
            }
        });
    }

    @ReactMethod
    public void refreshSession(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.CafeSession session = Textile.instance().cafes.refreshSession(peerId);
                    promise.resolve(Util.encode(session.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("refreshSession", e);
                }
            }
        });
    }

    @ReactMethod
    public void deregister(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().cafes.deregister(peerId);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("deregister", e);
                }
            }
        });
    }

    @ReactMethod
    public void checkMessages(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().cafes.checkMessages();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("checkMessages", e);
                }
            }
        });
    }
}
