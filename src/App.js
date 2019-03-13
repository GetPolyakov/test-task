import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AuthorizedLayout } from "./auth/containers/AuthorizedLayout/AuthorizedLayout";
import { ProtectedRoute } from './auth/components/ProtectedRoute/ProtectedRoute';
import { Login } from "./auth/containers/Login/Login";

import { setIsUserAuth } from './auth/actions/action.set-is-user-auth.js'

import { AuthService } from "./auth/services/service.auth";
import {NotFound} from "./shared/components/NotFound/NotFound";

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
                if (location.pathname === '/login') {
                    setIsUserAuth(true);
                    history.push('/disc');
                } else {
                    setIsUserAuth(true);
                }
            } else {
                if (location.pathname !== '/login') {
                    history.push('/login')
                }
            }
        }
    }

    render() {
        return (
            <Switch>
                <Route path="/login" exact component={Login} />
                <ProtectedRoute path="\/(disc)?(/:folder+)?" component={AuthorizedLayout} />
                <Route component={NotFound}/>
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
