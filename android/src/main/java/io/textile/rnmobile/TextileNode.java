package io.textile.rnmobile;

import android.support.annotation.Nullable;
import android.util.Base64;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONObject;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import mobile.AddThreadConfig;
import mobile.CancelFn;
import mobile.Event;
import mobile.Messenger;
import mobile.Mobile;
import mobile.Mobile_;
import mobile.InitConfig;
import mobile.MigrateConfig;
import mobile.RunConfig;
import mobile.Callback;

public class TextileNode extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "TextileNode";
    private static ReactApplicationContext reactContext = null;

    // made public so external native libraries can interact
    public static Mobile_ node = null;
    public static CancelFn cancellableSearchContacts = null;

    private Executor executor = Executors.newSingleThreadExecutor();

    public TextileNode(ReactApplicationContext context) {
        // Pass in the context to the constructor and save it so you can emit events
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        super(context);

        reactContext = context;
    }

    @Override
    public String getName() {
        // Tell React the name of the module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        return REACT_CLASS;
    }

    @ReactMethod
    public void acceptExternalInvite(final String id_, final String key, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.acceptExternalInvite(id_, key));
                }
                catch (Exception e) {
                    promise.reject("acceptExternalInvite", e);
                }
            }
        });
    }

    @ReactMethod
    public void acceptInviteViaNotification(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.acceptInviteViaNotification(id_));
                }
                catch (Exception e) {
                    promise.reject("acceptInviteViaNotification", e);
                }
            }
        });
    }

    @ReactMethod
    public void addContact(final String contactJsonString, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.addContact(contactJsonString);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("addContact", e);
                }
            }
        });
    }

    @ReactMethod
    public void addExternalInvite(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addExternalInvite(threadId));
                }
                catch (Exception e) {
                    promise.reject("addExternalInvite", e);
                }
            }
        });
    }

    @ReactMethod
    public void addSchema(final String jsonstr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addSchema(jsonstr));
                }
                catch (Exception e) {
                    promise.reject("addSchema", e);
                }
            }
        });
    }

    @ReactMethod
    public void addThread(final String key, final String name, final String type, final String sharing, final String members, final String schema, final Boolean media, final Boolean cameraRoll, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    AddThreadConfig config = new AddThreadConfig();
                    config.setKey(key);
                    config.setName(name);
                    config.setType(type);
                    config.setSharing(sharing);
                    config.setMembers(members);
                    config.setSchema(schema);
                    config.setMedia(media);
                    config.setCameraRoll(cameraRoll);
                    promise.resolve(node.addThread(config));
                }
                catch (Exception e) {
                    promise.reject("addThread", e);
                }
            }
        });
    }

    @ReactMethod
    public void addComment(final String blockId, final String body, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addComment(blockId, body));
                }
                catch (Exception e) {
                    promise.reject("addComment", e);
                }
            }
        });
    }

    @ReactMethod
    public void addFiles(final String dir, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    byte[] bytes = Base64.decode(dir, Base64.DEFAULT);
                    promise.resolve(node.addFiles(bytes, threadId, caption));
                }
                catch (Exception e) {
                    promise.reject("addFiles", e);
                }
            }
        });
    }

    @ReactMethod
    public void addFilesByTarget(final String target, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addFilesByTarget(target, threadId, caption));
                }
                catch (Exception e) {
                    promise.reject("addFilesByTarget", e);
                }
            }
        });
    }

    @ReactMethod
    public void addIgnore(final String blockId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addIgnore(blockId));
                }
                catch (Exception e) {
                    promise.reject("addIgnore", e);
                }
            }
        });
    }

    @ReactMethod
    public void addInvite(final String threadId, final String inviteeId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addInvite(threadId, inviteeId));
                }
                catch (Exception e) {
                    promise.reject("addInvite", e);
                }
            }
        });
    }

    @ReactMethod
    public void addLike(final String blockId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addLike(blockId));
                }
                catch (Exception e) {
                    promise.reject("addLike", e);
                }
            }
        });
    }

    @ReactMethod
    public void addMessage(final String threadId, final String body, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addMessage(threadId, body));
                }
                catch (Exception e) {
                    promise.reject("addMessage", e);
                }
            }
        });
    }

    @ReactMethod
    public void address(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.address());
                }
                catch (Exception e) {
                    promise.reject("address", e);
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
                    promise.resolve(node.avatar());
                }
                catch (Exception e) {
                    promise.reject("avatar", e);
                }
            }
        });
    }

    @ReactMethod
    public void cafeSession(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(stringEncode(node.cafeSession(peerId)));
                }
                catch (Exception e) {
                    promise.reject("cafeSession", e);
                }
            }
        });
    }

    @ReactMethod
    public void cafeSessions(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(stringEncode(node.cafeSessions()));
                }
                catch (Exception e) {
                    promise.reject("cafeSessions", e);
                }
            }
        });
    }

    @ReactMethod
    public void checkCafeMessages(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.checkCafeMessages();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("checkCafeMessages", e);
                }
            }
        });
    }

    @ReactMethod
    public void contact(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.contact(id_));
                }
                catch (Exception e) {
                    promise.reject("contact", e);
                }
            }
        });
    }

    @ReactMethod
    public void contactThreads(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.contactThreads(id_));
                }
                catch (Exception e) {
                    promise.reject("contactThreads", e);
                }
            }
        });
    }

    @ReactMethod
    public void contacts(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.contacts());
                }
                catch (Exception e) {
                    promise.reject("contacts", e);
                }
            }
        });
    }

    @ReactMethod
    public void countUnreadNotifications(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.countUnreadNotifications());
                }
                catch (Exception e) {
                    promise.reject("countUnreadNotifications", e);
                }
            }
        });
    }

    @ReactMethod
    public void deregisterCafe(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.deregisterCafe(peerId);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("deregisterCafe", e);
                }
            }
        });
    }

    @ReactMethod
    public void fileData(final String hash, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.fileData(hash));
                }
                catch (Exception e) {
                    promise.reject("fileData", e);
                }
            }
        });
    }

    @ReactMethod
    public void ignoreInviteViaNotification(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.ignoreInviteViaNotification(id_);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("ignoreInviteViaNotification", e);
                }
            }
        });
    }

    @ReactMethod
    public void imageFileDataForMinWidth(final String pth, final Integer minWidth, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.imageFileDataForMinWidth(pth, minWidth));
                }
                catch (Exception e) {
                    promise.reject("imageFileDataForMinWidth", e);
                }
            }
        });
    }

    @ReactMethod
    public void notifications(final String offset, final Integer limit, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.notifications(offset, limit));
                }
                catch (Exception e) {
                    promise.reject("notifications", e);
                }
            }
        });
    }

    @ReactMethod
    public void overview(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.overview());
                }
                catch (Exception e) {
                    promise.reject("overview", e);
                }
            }
        });
    }

    @ReactMethod
    public void peerId(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.peerId());
                }
                catch (Exception e) {
                    promise.reject("peerId", e);
                }
            }
        });
    }

    @ReactMethod
    public void prepareFiles(final String path, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(stringEncode(node.prepareFiles(path, threadId)));
                }
                catch (Exception e) {
                    promise.reject("prepareFiles", e);
                }
            }
        });
    }

    @ReactMethod
    public void prepareFilesAsync(final String path, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.prepareFilesAsync(path, threadId, new Callback() {
                        @Override
                        public void call(byte[] bytes, Exception e) {
                            if (e == null) {
                                promise.resolve(stringEncode(bytes));
                            } else {
                                promise.reject("prepareFilesAsync", e);
                            }
                        }
                    });
                }
                catch (Exception e) {
                    promise.reject("prepareFilesAsync", e);
                }
            }
        });
    }

    @ReactMethod
    public void profile(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.profile());
                }
                catch (Exception e) {
                    promise.reject("profile", e);
                }
            }
        });
    }

    @ReactMethod
    public void readAllNotifications(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.readAllNotifications();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("readAllNotifications", e);
                }
            }
        });
    }

    @ReactMethod
    public void readNotification(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.readNotification(id_);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("readNotification", e);
                }
            }
        });
    }

    @ReactMethod
    public void refreshCafeSession(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(stringEncode(node.refreshCafeSession(peerId)));
                }
                catch (Exception e) {
                    promise.reject("refreshCafeSession", e);
                }
            }
        });
    }

    @ReactMethod
    public void registerCafe(final String peerId, final String token, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.registerCafe(peerId, token);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("registerCafe", e);
                }
            }
        });
    }

    @ReactMethod
    public void removeContact(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.removeContact(id_);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("removeContact", e);
                }
            }
        });
    }

    @ReactMethod
    public void removeThread(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.removeThread(id_));
                }
                catch (Exception e) {
                    promise.reject("removeThread", e);
                }
            }
        });
    }

    @ReactMethod
    public void searchContacts(final String query, final String options, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    byte[] queryBytes = Base64.decode(query, Base64.DEFAULT);
                    byte[] optionsBytes = Base64.decode(options, Base64.DEFAULT);
                    if (TextileNode.cancellableSearchContacts != null) {
                        TextileNode.cancellableSearchContacts.call();
                    }
                    CancelFn newCancel = node.searchContacts(queryBytes, optionsBytes, new Callback() {
                        @Override
                        public void call(byte[] bytes, Exception e) {
                            if (e == null) {
                                if (bytes != null) {
                                    String base64 = Base64.encodeToString(bytes, Base64.DEFAULT);
                                    WritableMap payload = new WritableNativeMap();
                                    payload.putString("buffer", base64);
                                    TextileNode.emitDeviceEvent("@textile/sdk/searchContactsResult", payload);
                                } else {
                                    TextileNode.emitDeviceEvent("@textile/sdk/searchContactsResult", null);
                                }
                            } else {
                                WritableMap payload = new WritableNativeMap();
                                payload.putString("message", e.getMessage());
                                TextileNode.emitDeviceEvent("@textile/sdk/searchContactsError", payload);
                            }
                        }
                    });
                    TextileNode.cancellableSearchContacts = newCancel;
                }
                catch (Exception e) {
                    promise.reject("searchContacts", e);
                }
            }
        });
    }

    @ReactMethod
    public void cancelSearchContacts(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (TextileNode.cancellableSearchContacts != null) {
                        TextileNode.cancellableSearchContacts.call();
                        TextileNode.cancellableSearchContacts = null;
                    }
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("cancelSearchContacts", e);
                }
            }
        });
    }

    @ReactMethod
    public void seed(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.seed());
                }
                catch (Exception e) {
                    promise.reject("seed", e);
                }
            }
        });
    }

    @ReactMethod
    public void setAvatar(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.setAvatar(id_);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("setAvatar", e);
                }
            }
        });
    }

    @ReactMethod
    public void setLogLevels(final String levels, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.setLogLevels(levels);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("setLogLevels", e);
                }
            }
        });
    }

    @ReactMethod
    public void setUsername(final String username, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.setUsername(username);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("setUsername", e);
                }
            }
        });
    }

    @ReactMethod
    public void start(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.start();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("start", e);
                }
            }
        });
    }

    @ReactMethod
    public void stop(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.stop();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("stop", e);
                }
            }
        });
    }

    @ReactMethod
    public void feed(final String offset, final Integer limit, final Integer mode, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    int m = mode != null ? mode : 0;
                    promise.resolve(stringEncode(node.feed(offset, limit, threadId, m)));
                }
                catch (Exception e) {
                    promise.reject("feed", e);
                }
            }
        });
    }

    @ReactMethod
    public void files(final String offset, final Integer limit, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(stringEncode(node.files(offset, limit, threadId)));
                }
                catch (Exception e) {
                    promise.reject("files", e);
                }
            }
        });
    }

    @ReactMethod
    public void messages(final String offset, final Integer limit, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(stringEncode(node.messages(offset, limit, threadId)));
                }
                catch (Exception e) {
                    promise.reject("messages", e);
                }
            }
        });
    }

    @ReactMethod
    public void threadInfo(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.threadInfo(threadId));
                }
                catch (Exception e) {
                    promise.reject("threadInfo", e);
                }
            }
        });
    }

    @ReactMethod
    public void threads(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.threads());
                }
                catch (Exception e) {
                    promise.reject("threads", e);
                }
            }
        });
    }

    @ReactMethod
    public void username(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.username());
                }
                catch (Exception e) {
                    promise.reject("username", e);
                }
            }
        });
    }

    @ReactMethod
    public void version(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.version());
                }
                catch (Exception e) {
                    promise.reject("version", e);
                }
            }
        });
    }

    @ReactMethod
    public void initRepo(final String seed, final String repoPath, final Boolean logToDisk, final Boolean debug, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    InitConfig config = new InitConfig();
                    config.setSeed(seed);
                    config.setRepoPath(repoPath);
                    config.setLogToDisk(logToDisk);
                    config.setDebug(debug);
                    Mobile.initRepo(config);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("initRepo", e);
                }
            }
        });
    }

    @ReactMethod
    public void migrateRepo(final String repoPath, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    MigrateConfig config = new MigrateConfig();
                    config.setRepoPath(repoPath);
                    Mobile.migrateRepo(config);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("migrateRepo", e);
                }
            }
        });
    }

    @ReactMethod
    public void newTextile(final String repoPath, final Boolean debug, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                if (node == null) {
                    try {
                        RunConfig config = new RunConfig();
                        config.setRepoPath(repoPath);
                        config.setDebug(debug);
                        node = Mobile.newTextile(config, new Messenger() {
                            @Override
                            public void notify(Event event) {
                                try {
                                    WritableMap payload = JsonConvert.jsonToReact(new JSONObject(event.getPayload()));
                                    TextileNode.emitDeviceEvent(event.getName(), payload);
                                }
                                catch (Exception e) {
                                    //
                                }
                            }
                        });
                        promise.resolve(null);
                    }
                    catch (Exception e) {
                        promise.reject("newTextile", e);
                    }
                } else {
                    promise.resolve(null);
                }
            }
        });
    }

    @ReactMethod
    public void newWallet(final Integer wordCount, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Mobile.newWallet(wordCount));
                }
                catch (Exception e) {
                    promise.reject("newWallet", e);
                }
            }
        });
    }

    @ReactMethod
    public void walletAccountAt(final String phrase, final Integer index, final String password, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String p = password != null ? password : "";
                    promise.resolve(Mobile.walletAccountAt(phrase, index, p));
                }
                catch (Exception e) {
                    promise.reject("walletAccountAt", e);
                }
            }
        });
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        // A method for emitting from the native side to JS
        // https://facebook.github.io/react-native/docs/native-modules-android.html#sending-events-to-javascript
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    private static String stringEncode(byte[] data) {
        if (data == null) {
            return "";
        }
        return Base64.encodeToString(data, Base64.DEFAULT);
    }

}
