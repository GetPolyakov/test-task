import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticatedLayout from "./AuthenticatedLayout";
import Login from "./auth/containers/Login/Login";
import { ProtectedRoute } from './ProtectedRoute';
import NotFound from "./NotFound";

import setIsUserAuthenticated from './auth/actions/action.set-is-user-authenticated.js'
import AuthService from './auth/services/service.auth';
import LocalStorageService from './shared/services/LocalStorageService';

import {KEY_OF_STORED_TOKEN} from "./auth/constants";

class App extends Component {

    componentDidMount() { //оптимизировать
        const { location, history, setIsUserAuthenticated } = this.props;
        const token = AuthService.getTokenFromUrlHash(location.hash)
        if (token) {
            LocalStorageService.setItem(KEY_OF_STORED_TOKEN, token)
            setIsUserAuthenticated(true);
            history.push('/')
        } else {
            const token = LocalStorageService.getItem(KEY_OF_STORED_TOKEN);
            if (token) {
                setIsUserAuthenticated(true);
                history.push('/')
            }
        }
    }

    render() { // Застайлить NotFound и Login, добавить логаут
        return (
            <Switch>
                <Route path="/login" exact component={Login} />
                <ProtectedRoute path="\/(disc)?(/:folder+)?" component={AuthenticatedLayout} />
                <Route component={NotFound}/>
            </Switch>
        );
    }
}


export default withRouter(connect(
    state => ({}),
    dispatch => ({
        setIsUserAuthenticated: (isAuthenticated) => dispatch(setIsUserAuthenticated(isAuthenticated))
    })
)(App));
