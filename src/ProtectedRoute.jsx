import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Loader from "./shared/components/Loader/Loader";


const GetComponentForUserAuthStatus = ({ isAuthenticated, Component, componentProps }) => {
    if (isAuthenticated) {
        return <Component {...componentProps}/>
    } else if (isAuthenticated === null) {
        return <Loader/>
    } else {
    }   return <Redirect to="/login"/>
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
        return (<Route {...rest} render={(props) => (
            <GetComponentForUserAuthStatus isAuthenticated={isAuthenticated} Component={Component} componentProps={props} />
        )} />)
    }

export const ProtectedRoute = connect(
    state => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    },
    dispatch => ({

    })
)(withRouter(PrivateRoute));
