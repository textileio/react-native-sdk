package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.textile.Handlers;
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
    public void register(final String url, final String token, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().cafes.register(url, token, new Handlers.ErrorHandler() {
                    @Override
                    public void onComplete() {
                        promise.resolve(null);
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("register", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void deregister(final String sessionId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().cafes.deregister(sessionId, new Handlers.ErrorHandler() {
                    @Override
                    public void onComplete() {
                        promise.resolve(null);
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("deregister", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void refreshSession(final String sessionId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().cafes.refreshSession(sessionId, new Handlers.CafeSessionHandler() {
                    @Override
                    public void onComplete(final Model.CafeSession session) {
                        promise.resolve(Util.encode(session.toByteArray()));
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("refreshSession", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void checkMessages(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().cafes.checkMessages(new Handlers.ErrorHandler() {
                    @Override
                    public void onComplete() {
                        promise.resolve(null);
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("checkMessages", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void session(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final Model.CafeSession session = Textile.instance().cafes.session(peerId);
                    promise.resolve(session != null ? Util.encode(session.toByteArray()) : null);
                }
                catch (final Exception e) {
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
                    final Model.CafeSessionList list = Textile.instance().cafes.sessions();
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("sessions", e);
                }
            }
        });
    }
}
