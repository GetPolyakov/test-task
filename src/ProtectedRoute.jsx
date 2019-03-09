import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


class PrivateRoute extends Component {


    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props;
        return (<Route {...rest} render={(props) => (
            isAuthenticated ?
                <Component {...props} />
                :
                <Redirect to="/login"/>
        )} />)
    }
}

export const ProtectedRoute = connect(
    state => {
        return {
            isAuthenticated: true
        }
    },
    dispatch => ({

    })
)(withRouter(PrivateRoute));
