import { AuthActionTypes } from "./action.types";


export function setIsUserAuth(isAuthorized) {
    return {
        type: AuthActionTypes.SET_IS_USER_AUTH,
        payload: {
            isAuthorized
        }
    }
}
