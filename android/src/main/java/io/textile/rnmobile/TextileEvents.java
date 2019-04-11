package io.textile.rnmobile;

import io.textile.pb.Model;
import io.textile.pb.View;
import io.textile.textile.TextileEventListener;

public class TextileEvents implements TextileEventListener {

    @Override
    public void nodeStarted() {

    }

    @Override
    public void nodeFailedToStart(Exception e) {

    }

    @Override
    public void nodeStopped() {

    }

    @Override
    public void nodeFailedToStop(Exception e) {

    }

    @Override
    public void nodeOnline() {

    }

    @Override
    public void willStopNodeInBackgroundAfterDelay(int seconds) {

    }

    @Override
    public void canceledPendingNodeStop() {

    }

    @Override
    public void notificationReceived(Model.Notification notification) {

    }

    @Override
    public void threadUpdateReceived(View.FeedItem feedItem) {

    }

    @Override
    public void threadAdded(String threadId) {

    }

    @Override
    public void threadRemoved(String threadId) {

    }

    @Override
    public void accountPeerAdded(String peerId) {

    }

    @Override
    public void accountPeerRemoved(String peerId) {

    }

    @Override
    public void queryDone(String queryId) {

    }

    @Override
    public void queryError(String queryId, Exception e) {

    }

    @Override
    public void clientThreadQueryResult(String queryId, Model.Thread thread) {

    }

    @Override
    public void contactQueryResult(String queryId, Model.Contact contact) {

    }
}
