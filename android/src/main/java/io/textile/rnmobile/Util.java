package io.textile.rnmobile;

import android.util.Base64;

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
}
