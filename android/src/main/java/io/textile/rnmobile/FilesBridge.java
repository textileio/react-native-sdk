package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.pb.Mobile;
import io.textile.pb.Model;
import io.textile.pb.View;
import io.textile.textile.Files;
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
    public void prepare(final String strBase64, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().files.prepare(strBase64, threadId, new Files.PreparedFilesHandler() {
                    @Override
                    public void onFilesPrepared(Mobile.MobilePreparedFiles preparedFiles) {
                        promise.resolve(Util.encode(preparedFiles.toByteArray()));
                    }

                    @Override
                    public void onError(Exception e) {
                        promise.reject("prepare", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void prepareSync(final String strBase64, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Mobile.MobilePreparedFiles preparedFiles = Textile.instance().files.prepareSync(strBase64, threadId);
                    promise.resolve(Util.encode(preparedFiles.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("prepareSync", e);
                }
            }
        });
    }

    @ReactMethod
    public void prepareByPath(final String path, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().files.prepareByPath(path, threadId, new Files.PreparedFilesHandler() {
                    @Override
                    public void onFilesPrepared(Mobile.MobilePreparedFiles preparedFiles) {
                        promise.resolve(Util.encode(preparedFiles.toByteArray()));
                    }

                    @Override
                    public void onError(Exception e) {
                        promise.reject("prepareByPath", e);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void prepareByPathSync(final String path, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Mobile.MobilePreparedFiles preparedFiles = Textile.instance().files.prepareByPathSync(path, threadId);
                    promise.resolve(Util.encode(preparedFiles.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("prepareByPathSync", e);
                }
            }
        });
    }

    @ReactMethod
    public void add(final String dirStr, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    View.Directory directory = View.Directory.parseFrom(Util.decode(dirStr));
                    Model.Block block = Textile.instance().files.add(directory, threadId, caption);
                    promise.resolve(Util.encode(block.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("add", e);
                }
            }
        });
    }

    @ReactMethod
    public void addByTarget(final String target, final String threadId, final String caption, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Model.Block block = Textile.instance().files.addByTarget(target, threadId, caption);
                    promise.resolve(Util.encode(block.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("addByTarget", e);
                }
            }
        });
    }

    @ReactMethod
    public void list(final String offset, final Integer limit, final String threadId, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    View.FilesList list = Textile.instance().files.list(offset, limit, threadId);
                    promise.resolve(Util.encode(list.toByteArray()));
                }
                catch (Exception e) {
                    promise.reject("list", e);
                }
            }
        });
    }

    @ReactMethod
    public void data(final String hash, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().files.data(hash));
                }
                catch (Exception e) {
                    promise.reject("data", e);
                }
            }
        });
    }

    @ReactMethod
    public void imageDataForMinWidth(final String pth, final Integer minWidth, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().files.imageDataForMinWidth(pth, minWidth));
                }
                catch (Exception e) {
                    promise.reject("imageDataForMinWidth", e);
                }
            }
        });
    }
}
