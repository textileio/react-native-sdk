package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Model;
import io.textile.pb.QueryOuterClass;
import io.textile.textile.Textile;
import mobile.SearchHandle;

public class ContactsBridge extends ReactContextBaseJavaModule {

    private static SearchHandle searchHandle;

    private Executor executor = Executors.newSingleThreadExecutor();

    public ContactsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ContactsBridge";
    }

    @ReactMethod
    public void add(final String contactStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final Model.Contact contact = Model.Contact.parseFrom(Util.decode(contactStr));
                    Textile.instance().contacts.add(contact);
                    promise.resolve(null);
                }
                catch (final Exception e) {
                    promise.reject("add", e);
                }
            }
        });
    }

    @ReactMethod
    public void get(final String address, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final Model.Contact contact = Textile.instance().contacts.get(address);
                    promise.resolve(contact != null ? Util.encode(contact.toByteArray()) : null);
                }
                catch (final Exception e) {
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
                    final Model.ContactList list = Textile.instance().contacts.list();
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("list", e);
                }
            }
        });
    }

    @ReactMethod
    public void remove(final String address, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Textile.instance().contacts.remove(address);
                    promise.resolve(null);
                }
                catch (final Exception e) {
                    promise.reject("remove", e);
                }
            }
        });
    }

    @ReactMethod
    public void threads(final String address, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final Model.ThreadList list = Textile.instance().contacts.threads(address);
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("threads", e);
                }
            }
        });
    }

    @ReactMethod
    public void search(final String queryStr, final String optionsStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (ContactsBridge.searchHandle != null) {
                        ContactsBridge.searchHandle.cancel();
                    }
                    final QueryOuterClass.ContactQuery query = QueryOuterClass.ContactQuery.parseFrom(Util.decode(queryStr));
                    final QueryOuterClass.QueryOptions options = QueryOuterClass.QueryOptions.parseFrom(Util.decode(optionsStr));
                    ContactsBridge.searchHandle = Textile.instance().contacts.search(query, options);
                    promise.resolve(ContactsBridge.searchHandle.getId());
                }
                catch (final Exception e) {
                    promise.reject("search", e);
                }
            }
        });
    }

    @ReactMethod
    public void cancelSearch(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (ContactsBridge.searchHandle != null) {
                        ContactsBridge.searchHandle.cancel();
                        ContactsBridge.searchHandle = null;
                    }
                    promise.resolve(null);
                }
                catch (final Exception e) {
                    promise.reject("cancelSearch", e);
                }
            }
        });
    }
}
