import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import { DiscLayout } from "../../../disc/containers/DiscLayout/DiscLayout";
import { ApplicationNavbar } from "../../../shared/components/ApplicationNavbar/ApplicationNavbar";

import { setIsUserAuth } from "../../actions/action.set-is-user-auth";

import {AuthService} from "../../services/service.auth";

class AuthLayout extends Component  {

    onLogout = () => {
        const { history, setIsUserAuth } = this.props;
        AuthService.onLogout();
        setIsUserAuth(false);
        history.push('/login')
    }

    render() {

        return (
            <>
                <ApplicationNavbar onLogout={this.onLogout}/>
                <Switch>
                    <Route path="/disc(/:folder+)?" component={DiscLayout}/>
                    <Redirect to="/disc"/>
                </Switch>
            </>
        );
    }
};

AuthLayout.propTypes = {

};

export const AuthorizedLayout = connect(
    state => ({}),
    dispatch => ({
        setIsUserAuth: (isAuthorized) => dispatch(setIsUserAuth(isAuthorized))
    })
)(AuthLayout);
