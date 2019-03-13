import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import { DiscLayout } from "../../../disc/containers/DiscLayout/DiscLayout";

export class AuthorizedLayout extends Component  {

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
