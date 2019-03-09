import {getQueryParams} from "../../shared/utils/utils";

const TOKEN_PARAM = 'access_token';

export default {
    getTokenFromHash(hash) {
        const queryParamsString = hash.substring(1);
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

    onLogin() {
        window.location = process.env.REACT_APP_YANDEX_OAUTH_URL;
    }
};
