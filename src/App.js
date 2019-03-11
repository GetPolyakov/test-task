import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthorizedLayout from "./auth/containers/AuthorizedLayout/AuthorizedLayout";
import Login from "./auth/containers/Login/Login";
import { ProtectedRoute } from './auth/components/ProtectedRoute/ProtectedRoute';

import setIsUserAuthorized from './auth/actions/action.set-is-user-authorized.js'
import AuthService from './auth/services/service.auth';
import LocalStorageService from './shared/services/LocalStorageService';

import {KEY_OF_STORED_TOKEN} from "./auth/constants";

class App extends Component {

    componentDidMount() {
        const { location, history, setIsUserAuthorized } = this.props;
        const token = AuthService.getTokenFromUrlHash(location.hash)
        if (token) {
            LocalStorageService.setItem(KEY_OF_STORED_TOKEN, token)
            setIsUserAuthorized(true);
            history.push('/')
        } else {
            const token = LocalStorageService.getItem(KEY_OF_STORED_TOKEN);
            if (token) {
                setIsUserAuthorized(true);
            } else {
                setIsUserAuthorized(false);
            }
        }
    }

    render() {
        return (
            <Switch>
                <Route path="/login" exact component={Login} />
                <ProtectedRoute path="\/(disc)?(/:folder+)?" component={AuthorizedLayout} />
                <Redirect to="/login"/>
            </Switch>
        );
    }
}


export default withRouter(connect(
    state => ({}),
    dispatch => ({
        setIsUserAuthorized: (isAuthorized) => dispatch(setIsUserAuthorized(isAuthorized))
    })
)(App));
