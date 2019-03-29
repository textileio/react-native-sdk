package io.textile.rnmobile;

import android.support.annotation.Nullable;
import android.util.Base64;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import mobile.Event;
import mobile.Messenger;
import mobile.Mobile;
import mobile.Mobile_;
import mobile.InitConfig;
import mobile.MigrateConfig;
import mobile.RunConfig;
import mobile.Callback;
import mobile.SearchHandle;

public class TextileNode extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "TextileNode";
    private static ReactApplicationContext reactContext = null;

    // made public so external native libraries can interact
    public static Mobile_ node = null;
    private static SearchHandle searchHandle = null;

    private Executor executor = Executors.newSingleThreadExecutor();

    public TextileNode(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    // Account ---------------->

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
    public void encrypt(final String inputStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.encrypt(decode(inputStr))));
                }
                catch (Exception e) {
                    promise.reject("encrypt", e);
                }
            }
        });
    }

    @ReactMethod
    public void decrypt(final String inputStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.decrypt(decode(inputStr))));
                }
                catch (Exception e) {
                    promise.reject("decrypt", e);
                }
            }
        });
    }

    @ReactMethod
    public void accountContact(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.accountContact()));
                }
                catch (Exception e) {
                    promise.reject("accountContact", e);
                }
            }
        });
    }

    @ReactMethod
    public void syncAccount(final String optionsStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (TextileNode.searchHandle != null) {
                        TextileNode.searchHandle.cancel();
                    }
                    TextileNode.searchHandle = node.syncAccount(decode(optionsStr));
                }
                catch (Exception e) {
                    promise.reject("syncAccount", e);
                }
            }
        });
    }


    // Cafes ---------------->

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
    public void cafeSession(final String peerId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.cafeSession(peerId)));
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
                    promise.resolve(encode(node.cafeSessions()));
                }
                catch (Exception e) {
                    promise.reject("cafeSessions", e);
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
                    promise.resolve(encode(node.refreshCafeSession(peerId)));
                }
                catch (Exception e) {
                    promise.reject("refreshCafeSession", e);
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


    // Comments ---------------->

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


    // Contacts ---------------->

    @ReactMethod
    public void addContact(final String contactStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.addContact(decode(contactStr));
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("addContact", e);
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
                    promise.resolve(encode(node.contact(id_)));
                }
                catch (Exception e) {
                    promise.reject("contact", e);
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
                    promise.resolve(encode(node.contacts()));
                }
                catch (Exception e) {
                    promise.reject("contacts", e);
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
    public void contactThreads(final String id_, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.contactThreads(id_)));
                }
                catch (Exception e) {
                    promise.reject("contactThreads", e);
                }
            }
        });
    }

    @ReactMethod
    public void searchContacts(final String queryStr, final String optionsStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (TextileNode.searchHandle != null) {
                        TextileNode.searchHandle.cancel();
                    }
                    TextileNode.searchHandle = node.searchContacts(decode(queryStr), decode(optionsStr));
                }
                catch (Exception e) {
                    promise.reject("searchContacts", e);
                }
            }
        });
    }


    // Feed ---------------->

    @ReactMethod
    public void feed(final String reqStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.feed(decode(reqStr))));
                }
                catch (Exception e) {
                    promise.reject("feed", e);
                }
            }
        });
    }


    // Files ---------------->

    @ReactMethod
    public void prepareFiles(final String strBase64, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.prepareFiles(strBase64, threadId, new Callback() {
                        @Override
                        public void call(byte[] data, Exception e) {
                            if (e == null) {
                                promise.resolve(encode(data));
                            } else {
                                promise.reject("prepareFiles", e);
                            }
                        }
                    });
                }
                catch (Exception e) {
                    promise.reject("prepareFiles", e);
                }
            }
        });
    }

    @ReactMethod
    public void prepareFilesSync(final String strBase64, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.prepareFilesSync(strBase64, threadId)));
                }
                catch (Exception e) {
                    promise.reject("prepareFilesSync", e);
                }
            }
        });
    }

    @ReactMethod
    public void prepareFilesByPath(final String path, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.prepareFilesByPath(path, threadId, new Callback() {
                        @Override
                        public void call(byte[] data, Exception e) {
                            if (e == null) {
                                promise.resolve(encode(data));
                            } else {
                                promise.reject("prepareFilesByPath", e);
                            }
                        }
                    });
                }
                catch (Exception e) {
                    promise.reject("prepareFilesByPath", e);
                }
            }
        });
    }

    @ReactMethod
    public void prepareFilesByPathSync(final String path, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.prepareFilesByPathSync(path, threadId)));
                }
                catch (Exception e) {
                    promise.reject("prepareFilesByPathSync", e);
                }
            }
        });
    }

    @ReactMethod
    public void addFiles(final String dirStr, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.addFiles(decode(dirStr), threadId, caption)));
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
                    promise.resolve(encode(node.addFilesByTarget(target, threadId, caption)));
                }
                catch (Exception e) {
                    promise.reject("addFilesByTarget", e);
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
                    promise.resolve(encode(node.files(offset, limit, threadId)));
                }
                catch (Exception e) {
                    promise.reject("files", e);
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


    // Flags ---------------->

    @ReactMethod
    public void addFlag(final String blockId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.addFlag(blockId));
                }
                catch (Exception e) {
                    promise.reject("addFlag", e);
                }
            }
        });
    }


    // Ignores ---------------->

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


    // Invites ---------------->

    @ReactMethod
    public void addInvite(final String threadId, final String address, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.addInvite(threadId, address);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("addInvite", e);
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
                    promise.resolve(encode(node.addExternalInvite(threadId)));
                }
                catch (Exception e) {
                    promise.reject("addExternalInvite", e);
                }
            }
        });
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


    // Ipfs ---------------->

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
    public void dataAtPath(final String path, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.dataAtPath(path)));
                }
                catch (Exception e) {
                    promise.reject("dataAtPath", e);
                }
            }
        });
    }


    // Likes ---------------->

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


    // Logs ---------------->

    @ReactMethod
    public void setLogLevels(final String levelStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.setLogLevel(decode(levelStr));
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("setLogLevels", e);
                }
            }
        });
    }


    // Messages ---------------->

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
    public void messages(final String offset, final Integer limit, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.messages(offset, limit, threadId)));
                }
                catch (Exception e) {
                    promise.reject("messages", e);
                }
            }
        });
    }


    // Notifications ---------------->

    @ReactMethod
    public void notifications(final String offset, final Integer limit, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.notifications(offset, limit)));
                }
                catch (Exception e) {
                    promise.reject("notifications", e);
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


    // Profile ---------------->

    @ReactMethod
    public void profile(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.profile()));
                }
                catch (Exception e) {
                    promise.reject("profile", e);
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
                    promise.resolve(node.name());
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
                    node.setName(name);
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
                    promise.resolve(node.avatar());
                }
                catch (Exception e) {
                    promise.reject("avatar", e);
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


    // Schemas ---------------->

    @ReactMethod
    public void addSchema(final String nodeStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.addSchema(decode(nodeStr))));
                }
                catch (Exception e) {
                    promise.reject("addSchema", e);
                }
            }
        });
    }


    // Threads ---------------->

    @ReactMethod
    public void addThread(final String configStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.addThread(decode(configStr))));
                }
                catch (Exception e) {
                    promise.reject("addThread", e);
                }
            }
        });
    }

    @ReactMethod
    public void addOrUpdateThread(final String threadStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.addOrUpdateThread(decode(threadStr));
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("addOrUpdateThread", e);
                }
            }
        });
    }

    @ReactMethod
    public void renameThread(final String threadId, final String name, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.renameThread(threadId, name);
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("renameThread", e);
                }
            }
        });
    }

    @ReactMethod
    public void thread(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.thread(threadId)));
                }
                catch (Exception e) {
                    promise.reject("thread", e);
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
                    promise.resolve(encode(node.threads()));
                }
                catch (Exception e) {
                    promise.reject("threads", e);
                }
            }
        });
    }

    @ReactMethod
    public void threadPeers(final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.threadPeers(threadId)));
                }
                catch (Exception e) {
                    promise.reject("threadPeers", e);
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
    public void snapshotThreads(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    node.snapshotThreads();
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("snapshotThreads", e);
                }
            }
        });
    }

    @ReactMethod
    public void searchThreadSnapshots(final String queryStr, final String optionsStr, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (TextileNode.searchHandle != null) {
                        TextileNode.searchHandle.cancel();
                    }
                    TextileNode.searchHandle = node.searchThreadSnapshots(decode(queryStr), decode(optionsStr));
                }
                catch (Exception e) {
                    promise.reject("searchThreadSnapshots", e);
                }
            }
        });
    }


    // Mobile ---------------->

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
                    promise.resolve(encode(Mobile.walletAccountAt(phrase, index, p)));
                }
                catch (Exception e) {
                    promise.reject("walletAccountAt", e);
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
                                TextileNode.emitDeviceEvent(event.getName(), encode(event.getData()));
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
    public void gitSummary(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(node.gitSummary());
                }
                catch (Exception e) {
                    promise.reject("gitSummary", e);
                }
            }
        });
    }

    @ReactMethod
    public void summary(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(encode(node.summary()));
                }
                catch (Exception e) {
                    promise.reject("summary", e);
                }
            }
        });
    }


    // Helpers ---------------->

    @ReactMethod
    public void cancelSearch(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (TextileNode.searchHandle != null) {
                        TextileNode.searchHandle.cancel();
                        TextileNode.searchHandle = null;
                    }
                    promise.resolve(null);
                }
                catch (Exception e) {
                    promise.reject("cancelSearch", e);
                }
            }
        });
    }

    private static void emitDeviceEvent(String eventName, @Nullable String eventData) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    private static String encode(byte[] data) {
        if (data == null) {
            return "";
        }
        return Base64.encodeToString(data, Base64.DEFAULT);
    }

    private static byte[] decode(String str) {
        if (str.equals("")) {
            return null;
        }
        return Base64.decode(str, Base64.DEFAULT);
    }

}
