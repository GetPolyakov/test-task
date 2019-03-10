import { AuthActionTypes } from "./action.types";


export default function setIsUserAuthenticated(isAuthenticated) {
    return {
        type: AuthActionTypes.SET_IS_USER_AUTHENTICATED,
        payload: {
            isAuthenticated
        }

    }
}
