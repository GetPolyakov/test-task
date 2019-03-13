import { combineReducers } from 'redux'
import { auth }  from '../auth/reducers/reducer.auth'
import { resources } from "../disc/reducers/reducer.resources";

export default combineReducers({
    auth,
    resources
})
