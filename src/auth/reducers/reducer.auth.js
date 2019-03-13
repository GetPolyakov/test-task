import { AuthActionTypes } from "../actions/action.types";

const initialState = {
    isAuthorized: false,
    isLoading: true
}

export function auth (state = initialState, action) {
    switch (action.type) {
        case AuthActionTypes.SET_IS_USER_AUTH: {
            return {
                ...state,
                isAuthorized: action.payload.isAuthorized,
                isLoading: false
            }
        }
        default: return state;
    }
}
