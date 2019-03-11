import { AuthActionTypes } from "./action.types";


export default function setIsUserAuthorized(isAuthorized) {
    return {
        type: AuthActionTypes.SET_IS_USER_AUTHORIZED,
        payload: {
            isAuthorized: isAuthorized
        }

    }
}
