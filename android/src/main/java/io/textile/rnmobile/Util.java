package io.textile.rnmobile;

import android.util.Base64;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import io.textile.textile.FeedItemData;

public class Util {

    static String encode(final byte[] data) {
        if (data == null) {
            return "";
        }
        return Base64.encodeToString(data, Base64.DEFAULT);
    }

    static byte[] decode(final String str) {
        if (str.equals("")) {
            return null;
        }
        return Base64.decode(str, Base64.DEFAULT);
    }

    static WritableMap encodeData(final byte[] data, final String media) {
        final WritableMap map = new WritableNativeMap();
        map.putString("data", Util.encode(data));
        map.putString("media", media);
        return map;
    }

    static String feedItemDataToBase64(final FeedItemData feedItemData) {
        switch(feedItemData.type) {
            case TEXT:
                return encode(feedItemData.text.toByteArray());
            case LIKE:
                return encode(feedItemData.like.toByteArray());
            case COMMENT:
                return encode(feedItemData.comment.toByteArray());
            case FILES:
                return encode(feedItemData.files.toByteArray());
            case IGNORE:
                return encode(feedItemData.ignore.toByteArray());
            case JOIN:
                return encode(feedItemData.join.toByteArray());
            case LEAVE:
                return encode(feedItemData.leave.toByteArray());
            case ANNOUNCE:
                return encode(feedItemData.announce.toByteArray());
            default:
                return null;
        }
    }
}
