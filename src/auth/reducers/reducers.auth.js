import { AuthActionTypes } from "../actions/action.types";

const initialState = {
    isAuthenticated: null
}

export default function auth (state = initialState, action) {
    switch (action.type) {
        case AuthActionTypes.SET_IS_USER_AUTHENTICATED: {
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        }
    }
    return state;
}
