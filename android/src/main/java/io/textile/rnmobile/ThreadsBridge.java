package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.pb.QueryOuterClass;
import io.textile.pb.View;
import io.textile.textile.Textile;
import mobile.SearchHandle;

public class ThreadsBridge extends ReactContextBaseJavaModule {

    private static SearchHandle searchHandle;

    private Executor executor = Executors.newSingleThreadExecutor();

    public ThreadsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ThreadsBridge";
    }

    @ReactMethod
    public void add(final String configStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    View.AddThreadConfig config = View.AddThreadConfig.parseFrom(Util.decode(configStr));
                    Model.Thread thread = Textile.instance().threads.add(config);
                    promise.resolve(Util.encode(thread.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("add", e);
                }
            }
        });
    }

    @ReactMethod
    public void addOrUpdate(final String threadStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.Thread thread = Model.Thread.parseFrom(Util.decode(threadStr));
                    Textile.instance().threads.addOrUpdate(thread);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("addOrUpdate", e);
                }
            }
        });
    }

    @ReactMethod
    public void rename(final String threadId, final String name, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().threads.rename(threadId, name);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("rename", e);
                }
            }
        });
    }

    @ReactMethod
    public void get(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.Thread thread = Textile.instance().threads.get(threadId);
                    promise.resolve(Util.encode(thread.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("get", e);
                }
            }
        });
    }

    @ReactMethod
    public void list(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.ThreadList list = Textile.instance().threads.list();
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("list", e);
                }
            }
        });
    }

    @ReactMethod
    public void peers(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.ContactList list = Textile.instance().threads.peers(threadId);
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("peers", e);
                }
            }
        });
    }

    @ReactMethod
    public void remove(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().threads.remove(threadId));
                }
                catch (Exception e) {
                    promise.reject("remove", e);
                }
            }
        });
    }

    @ReactMethod
    public void snapshot(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().threads.snapshot();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("snapshot", e);
                }
            }
        });
    }

    @ReactMethod
    public void searchSnapshots(final String queryStr, final String optionsStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (ThreadsBridge.searchHandle != null) {
                        ThreadsBridge.searchHandle.cancel();
                    }
                    QueryOuterClass.ThreadSnapshotQuery query = QueryOuterClass.ThreadSnapshotQuery.parseFrom(Util.decode(queryStr));
                    QueryOuterClass.QueryOptions options = QueryOuterClass.QueryOptions.parseFrom(Util.decode(optionsStr));
                    ThreadsBridge.searchHandle = Textile.instance().threads.searchSnapshots(query, options);
                    promise.resolve(ThreadsBridge.searchHandle.getId());
                }
                catch (Exception e) {
                    promise.reject("searchSnapshots", e);
                }
            }
        });
    }

    @ReactMethod
    public void cancelSearchSnapshots(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (ThreadsBridge.searchHandle != null) {
                        ThreadsBridge.searchHandle.cancel();
                        ThreadsBridge.searchHandle = null;
                    }
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("cancelSync", e);
                }
            }
        });
    }
}
