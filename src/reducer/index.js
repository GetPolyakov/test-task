import { combineReducers } from 'redux'
import { TEST } from '../actions/testAction';

const initialState = {
    test: ''
}

const reducerTest =  (state = initialState, action) => {
    switch (action.type) {
        case TEST: return {
            ...state,
            test: 'yes'
        }
    }
    return state;
}

export default combineReducers({
    reducerTest
})
