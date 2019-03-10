import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import DiscLayout from "../../../disc/containers/DiscLayout/DiscLayout";
import ApplicationNavbar from "../../../shared/components/ApplicationNavbar/ApplicationNavbar";

import LocalStorageService from "../../../shared/services/LocalStorageService";
import {KEY_OF_STORED_TOKEN} from "../../constants";
import setIsUserAuthenticated from "../../actions/action.set-is-user-authenticated";

class AuthenticatedLayout extends Component  {

    onLogout = () => {
        const { history, setIsUserAuthenticated } = this.props;
        LocalStorageService.removeItem(KEY_OF_STORED_TOKEN);
        setIsUserAuthenticated(false);
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

AuthenticatedLayout.propTypes = {

};

export default connect(
    state => ({}),
    dispatch => ({
        setIsUserAuthenticated: (isAuthenticated) => dispatch(setIsUserAuthenticated(isAuthenticated))
    })
)(AuthenticatedLayout);
