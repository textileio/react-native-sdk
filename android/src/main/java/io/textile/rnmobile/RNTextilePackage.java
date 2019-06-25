//  Created by react-native-create-bridge

package io.textile.rnmobile;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNTextilePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(final ReactApplicationContext reactContext) {
        // Register your native module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#register-the-module
        final List<NativeModule> modules = new ArrayList<>();

        modules.add(new AccountBridge(reactContext));
        modules.add(new CafesBridge(reactContext));
        modules.add(new CommentsBridge(reactContext));
        modules.add(new ContactsBridge(reactContext));
        modules.add(new FeedBridge(reactContext));
        modules.add(new FilesBridge(reactContext));
        modules.add(new FlagsBridge(reactContext));
        modules.add(new IgnoresBridge(reactContext));
        modules.add(new InvitesBridge(reactContext));
        modules.add(new IpfsBridge(reactContext));
        modules.add(new LikesBridge(reactContext));
        modules.add(new LogsBridge(reactContext));
        modules.add(new MessagesBridge(reactContext));
        modules.add(new NotificationsBridge(reactContext));
        modules.add(new ProfileBridge(reactContext));
        modules.add(new SchemasBridge(reactContext));
        modules.add(new TextileBridge(reactContext));
        modules.add(new ThreadsBridge(reactContext));

        return modules;
    }
    // Deprecated RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(final ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
