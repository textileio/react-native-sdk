package io.textile.rnmobile;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import io.textile.pb.Model;
import io.textile.textile.FeedItemData;
import io.textile.textile.TextileEventListener;

class TextileEvents implements TextileEventListener {

    private DeviceEventManagerModule.RCTDeviceEventEmitter emitter;

    TextileEvents(final DeviceEventManagerModule.RCTDeviceEventEmitter emitter) {
        this.emitter = emitter;
    }

    @Override
    public void nodeStarted() {
        emitter.emit("NODE_STARTED", null);
    }

    @Override
    public void nodeFailedToStart(final Exception e) {
        emitter.emit("NODE_FAILED_TO_START", e.getMessage());
    }

    @Override
    public void nodeStopped() {
        emitter.emit("NODE_STOPPED", null);
    }

    @Override
    public void nodeFailedToStop(final Exception e) {
        emitter.emit("NODE_FAILED_TO_STOP", e.getMessage());
    }

    @Override
    public void nodeOnline() {
        emitter.emit("NODE_ONLINE", null);
    }

    @Override
    public void willStopNodeInBackgroundAfterDelay(final int seconds) {
        emitter.emit("WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY", seconds);
    }

    @Override
    public void canceledPendingNodeStop() {
        emitter.emit("CANCELED_PENDING_NODE_STOP", null);
    }

    @Override
    public void notificationReceived(final Model.Notification notification) {
        emitter.emit("NOTIFICATION_RECEIVED", Util.encode(notification.toByteArray()));
    }

    @Override
    public void threadUpdateReceived(final String threadId, final FeedItemData feedItemData) {
        final WritableMap map = Arguments.createMap();
        map.putString("threadId", threadId);
        map.putString("block", feedItemData.block);
        map.putInt("type", feedItemData.type.ordinal());
        map.putString("data", Util.feedItemDataToBase64(feedItemData));
        emitter.emit("THREAD_UPDATE_RECEIVED", map);
    }

    @Override
    public void threadAdded(final String threadId) {
        emitter.emit("THREAD_ADDED", threadId);
    }

    @Override
    public void threadRemoved(final String threadId) {
        emitter.emit("THREAD_REMOVED", threadId);
    }

    @Override
    public void accountPeerAdded(final String peerId) {
        emitter.emit("ACCOUNT_PEER_ADDED", peerId);
    }

    @Override
    public void accountPeerRemoved(final String peerId) {
        emitter.emit("ACCOUNT_PEER_REMOVED", peerId);
    }

    @Override
    public void queryDone(final String queryId) {
        emitter.emit("QUERY_DONE", queryId);
    }

    @Override
    public void queryError(final String queryId, final Exception e) {
        final WritableMap map = new WritableNativeMap();
        map.putString("queryId", queryId);
        map.putString("error", e.getMessage());
        emitter.emit("QUERY_ERROR", map);
    }

    @Override
    public void clientThreadQueryResult(final String queryId, final Model.Thread thread) {
        final WritableMap map = new WritableNativeMap();
        map.putString("queryId", queryId);
        map.putString("data", Util.encode(thread.toByteArray()));
        emitter.emit("CLIENT_THREAD_QUERY_RESULT", map);
    }

    @Override
    public void contactQueryResult(final String queryId, final Model.Contact contact) {
        final WritableMap map = new WritableNativeMap();
        map.putString("queryId", queryId);
        map.putString("data", Util.encode(contact.toByteArray()));
        emitter.emit("CONTACT_QUERY_RESULT", map);
    }

    @Override
    public void syncUpdate(final Model.CafeSyncGroupStatus status) {
        emitter.emit("SYNC_UPDATE", Util.encode(status.toByteArray()));
    }

    @Override
    public void syncComplete(final Model.CafeSyncGroupStatus status) {
        emitter.emit("SYNC_COMPLETE", Util.encode(status.toByteArray()));
    }

    @Override
    public void syncFailed(final Model.CafeSyncGroupStatus status) {
        emitter.emit("SYNC_FAILED", Util.encode(status.toByteArray()));
    }
}
