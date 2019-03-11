import { AuthActionTypes } from "../actions/action.types";

const initialState = {
    isAuthorized: null
}

export function auth (state = initialState, action) {
    switch (action.type) {
        case AuthActionTypes.SET_IS_USER_AUTHORIZED: {
            return {
                ...state,
                isAuthorized: action.payload.isAuthorized
            }
        }
    }
    return state;
}
