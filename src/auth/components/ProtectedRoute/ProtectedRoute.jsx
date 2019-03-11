import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Loader } from "../../../shared/components/Loader/Loader";


const GetComponentForUserAuthStatus = ({ isAuthorized, Component, componentProps }) => {
    if (isAuthorized) {
        return <Component {...componentProps}/>
    } else if (isAuthorized === null) {
        return <Loader/>
    } else {
        return <Redirect to="/login"/>
    }
}

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => {
        return (<Route {...rest} render={(props) => (
            <GetComponentForUserAuthStatus isAuthorized={isAuthorized} Component={Component} componentProps={props} />
        )} />)
    }

export const ProtectedRoute = connect(
    state => {
        return {
            isAuthorized: state.auth.isAuthorized
        }
    },
    dispatch => ({

    })
)(withRouter(PrivateRoute));
