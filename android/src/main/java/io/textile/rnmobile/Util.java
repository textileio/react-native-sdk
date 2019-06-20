package io.textile.rnmobile;

import android.util.Base64;

import io.textile.textile.FeedItemData;

public class Util {

    static String encode(byte[] data) {
        if (data == null) {
            return "";
        }
        return Base64.encodeToString(data, Base64.DEFAULT);
    }

    static byte[] decode(String str) {
        if (str.equals("")) {
            return null;
        }
        return Base64.decode(str, Base64.DEFAULT);
    }

    static String feedItemDataToBase64(FeedItemData feedItemData) {
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
            default:
                return null;
        }
    }
}
