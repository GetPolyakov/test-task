import { history } from "../../index";
import { getQueryParams } from "../../shared/utils/utils";

import { KEY_OF_STORED_TOKEN, TOKEN_PARAM } from "../constants";

import { ServiceLocalStorage } from "../../shared/services/service.local-storage";

export const AuthService = {
    _getTokenFromUrlHash(urlHash) {
        const queryParamsString = urlHash.substring(1);
        const queryParams = getQueryParams(queryParamsString)
        if (queryParams.length === 0) {
            return null;
        }
        const token = queryParams.find((x) => x.hasOwnProperty(TOKEN_PARAM));
        if (token === undefined) {
            return null;
        }

        return token[TOKEN_PARAM];
    },

    tryAuth(urlHash) {
        const token = this._getTokenFromUrlHash(urlHash);

        if (token) {
            ServiceLocalStorage.setItem(KEY_OF_STORED_TOKEN, token)
            return true;
        } else {
            const token = ServiceLocalStorage.getItem(KEY_OF_STORED_TOKEN);
            if (token) {
                return true
            }

            return false
        }
    },


    onLogin() {
        window.location = process.env.REACT_APP_YANDEX_OAUTH_URL;
    },

    onLogout() {
        ServiceLocalStorage.removeItem(KEY_OF_STORED_TOKEN);
    }
};
