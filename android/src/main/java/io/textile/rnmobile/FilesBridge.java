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

public class FilesBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public FilesBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FilesBridge";
    }

    @ReactMethod
    public void addData(final String base64, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().files.addData(
                        base64, threadId, caption, new Handlers.BlockHandler() {
                            @Override
                            public void onComplete(final Model.Block block) {
                                promise.resolve(Util.encode(block.toByteArray()));
                            }

                            @Override
                            public void onError(final Exception e) {
                                promise.reject("addData", e);
                            }
                        });
            }
        });
    }

    @ReactMethod
    public void addFiles(final String files, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().files.addFiles(files, threadId, caption, new Handlers.BlockHandler() {
                    @Override
                    public void onComplete(final Model.Block block) {
                        promise.resolve(Util.encode(block.toByteArray()));
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("addFiles", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void shareFiles(final String hash, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().files.shareFiles(hash, threadId, caption, new Handlers.BlockHandler() {
                    @Override
                    public void onComplete(final Model.Block block) {
                        promise.resolve(Util.encode(block.toByteArray()));
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("shareFiles", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public  void file(final String blockId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final View.Files files = Textile.instance().files.file(blockId);
                    promise.resolve(Util.encode(files.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("file", e);
                }
            }
        });
    }

    @ReactMethod
    public void list(final String threadId, final String offset, final Integer limit, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final View.FilesList list = Textile.instance().files.list(threadId, offset, limit);
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (final Exception e) {
                    promise.reject("list", e);
                }
            }
        });
    }

    @ReactMethod
    public void content(final String hash, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().files.content(hash, new Handlers.DataHandler() {
                    @Override
                    public void onComplete(final byte[] data, final String media) {
                        promise.resolve(Util.encodeData(data, media));
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("content", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void imageContentForMinWidth(final String pth, final Integer minWidth, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().files.imageContentForMinWidth(pth, minWidth, new Handlers.DataHandler() {
                    @Override
                    public void onComplete(final byte[] data, final String media) {
                        promise.resolve(Util.encodeData(data, media));
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("imageContentForMinWidth", e);
                    }
                });
            }
        });
    }
}
