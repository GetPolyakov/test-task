import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AuthorizedLayout } from "./auth/containers/AuthorizedLayout/AuthorizedLayout";
import { ProtectedRoute } from './auth/components/ProtectedRoute/ProtectedRoute';

import { setIsUserAuth } from './auth/actions/action.set-is-user-auth.js'

import { AuthService } from "./auth/services/service.auth";

class App extends Component {

    componentDidMount() {
        const { location, history, setIsUserAuth } = this.props;

        const token = AuthService.parseTokenFromUrlHash(location.hash);
        if (token) {
            setIsUserAuth(true)
            AuthService.setToken(token)
            history.push('/disc')
        } else {
            if (AuthService.isTokenExist()) {
                setIsUserAuth(true);
            } else {
                AuthService.redirectToLogin()
            }
        }


    }

    render() {
        return (
            <Switch>
                <ProtectedRoute path="\/(disc)?(/:folder+)?" component={AuthorizedLayout} />
            </Switch>
        );
    }
}


export default withRouter(connect(
    state => ({}),
    dispatch => ({
        setIsUserAuth: (urlHash) => dispatch(setIsUserAuth(urlHash))
    })
)(App));
