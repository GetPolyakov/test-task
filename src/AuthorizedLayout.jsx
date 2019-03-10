import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';

import DiscLayout from "./disc/containers/DiscLayout/DiscLayout";

const AuthorizedLayout = props => {
    return (
        <Switch>
            <Route path="/disc(/:folder+)?" component={DiscLayout} />
            <Redirect to="/disc"/>
        </Switch>
    );
};

AuthorizedLayout.propTypes = {
    
};

export default AuthorizedLayout;
