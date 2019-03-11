import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { Route, Redirect, withRouter } from 'react-router-dom';
import { Loader } from "../../../shared/components/Loader/Loader";


const GetComponentForUserAuthStatus = ({ isAuthorized, isLoading, Component, componentProps }) => {
    if (isAuthorized) {
        return <Component {...componentProps}/>
    } else if (isLoading) {
        return <Loader/>
    } else {
        return <Redirect to="/login"/>
    }
}

const PrivateRoute = ({ component: Component, isAuthorized, isLoading, ...rest }) => {
        return (<Route {...rest} render={(props) => (
            <GetComponentForUserAuthStatus isAuthorized={isAuthorized} isLoading={isLoading} Component={Component} componentProps={props} />
        )} />)
    }

export const ProtectedRoute = connect(
    state => {
        return {
            isAuthorized: state.auth.isAuthorized,
            isLoading: state.auth.isLoading
        }
    },
    dispatch => ({

    })
)(withRouter(PrivateRoute));

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    isAuthorized: PropTypes.bool.isRequired
}
