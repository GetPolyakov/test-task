import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import DiscLayout from "./disc/containers/DiscLayout/DiscLayout";
import Login from "./auth/containers/Login/Login";
import { ProtectedRoute } from './ProtectedRoute';
import NotFound from "./NotFound";

import AuthService from './auth/services/AuthService';
import LocalStorageService from './shared/services/LocalStorageService';

class App extends Component {
    componentDidMount() {
        const { location, history } = this.props;
        const token = AuthService.getTokenFromHash(location.hash)
        if (token) {
            LocalStorageService.setItem('token', token)
            history.push('/')
        }
    }

    render() {
        return (
            <Switch>
                <ProtectedRoute path="/" exact component={DiscLayout} />
                <Route path="/login" exact component={Login} />
                <Route component={NotFound}/>
            </Switch>
        );
    }
}


export default withRouter(App);
