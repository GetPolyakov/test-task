import { getQueryParams } from "../../shared/utils/utils";
import { TOKEN_PARAM } from "../constants";

export const AuthService = {
    getTokenFromUrlHash(urlHash) {
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

    onLogin() {
        window.location = process.env.REACT_APP_YANDEX_OAUTH_URL;
    }
};
