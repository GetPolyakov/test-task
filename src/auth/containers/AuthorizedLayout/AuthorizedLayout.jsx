import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import { DiscLayout } from "../../../disc/containers/DiscLayout/DiscLayout";

import { setIsUserAuth } from "../../actions/action.set-is-user-auth";

class AuthLayout extends Component  {

    render() {

        return (
            <>
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
