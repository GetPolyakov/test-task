import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AuthorizedLayout } from "./auth/containers/AuthorizedLayout/AuthorizedLayout";
import { Login } from "./auth/containers/Login/Login";
import { ProtectedRoute } from './auth/components/ProtectedRoute/ProtectedRoute';

import { setIsUserAuth } from './auth/actions/action.set-is-user-auth.js'

import { AuthService } from "./auth/services/service.auth";

class App extends Component {

    componentDidMount() {
        const { location, history, setIsUserAuth } = this.props;
        const isAuthorized = AuthService.tryAuth(location.hash)
        if (isAuthorized) {
            setIsUserAuth(isAuthorized)
            history.push('/')
        } else {
            setIsUserAuth(isAuthorized)
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
        setIsUserAuth: (urlHash) => dispatch(setIsUserAuth(urlHash))
    })
)(App));
