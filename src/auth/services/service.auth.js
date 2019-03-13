import { getQueryParams } from "../../shared/utils/utils";

import { KEY_OF_STORED_TOKEN, TOKEN_PARAM } from "../constants";

import { StorageService } from "../../shared/services/storage.service";

export const AuthService = {
    parseTokenFromUrlHash(urlHash) {
        const queryParamsString = urlHash.substring(1);
        const queryParams = getQueryParams(queryParamsString)
        if (queryParams.length === 0) {
            return null;
        }

        const token = queryParams.find((x) => x.hasOwnProperty(TOKEN_PARAM));

        return token ? token : null;
    },

    isTokenExist() {
        const token = StorageService.getItem(KEY_OF_STORED_TOKEN);
        if (token) {
            return true
        }

        return false
    },

    setToken(token) {
        StorageService.setItem(KEY_OF_STORED_TOKEN, token[TOKEN_PARAM])
    },

    getToken() {
        return StorageService.getItem(KEY_OF_STORED_TOKEN);
    },

    removeToken() {
        StorageService.removeItem(KEY_OF_STORED_TOKEN)
    },

    redirectToLogin() {
        window.location = process.env.REACT_APP_YANDEX_OAUTH_URL;
    },
};
