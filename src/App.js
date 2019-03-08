import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import Disk from "./Disk";
import Login from "./Login";
import {ProtectedRoute} from './ProtectedRoute';

const AUTH_URL = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${process.env.REACT_APP_YANDEX_CLIENT_ID}`;
const TOKEN_PARAM = 'access_token';
class App extends Component {
    componentDidMount() {
        const { location, history } = this.props;
        const token = this._getTokenFromHash(location.hash)
        this.setState({token}, () => {
            if (token) {
                history.push('/disk')
            }
        });
    }

    _getTokenFromHash = (hash) => { //оптимизировать не безопасный код
        const queryParams = this._getQueryParams(hash);

        const token = queryParams.find((x) => x.hasOwnProperty(TOKEN_PARAM));

        return token ? token : null;

    }

    _getQueryParams = (search) => { //оптимизировать не безопасный код
        const withQuestionMarkRemoved = search.substring(1);
        const partWithQueryParams = withQuestionMarkRemoved
        const queryParamsArr = partWithQueryParams.split('&');

        return queryParamsArr.reduce((acc, stringQueryParam, index) => {
            const queryParamArray = stringQueryParam.split('=');
            const queryParam = {};
            queryParam[queryParamArray[0]] = queryParamArray[1];
            acc.push(queryParam);
            return acc;
        }, [])
    }

    render() {
        return (
            <Switch>
                <Route path="/login" exact component={Login} />
                <ProtectedRoute path="/disk" component={Disk} />
                <Redirect to="/disk"/>
            </Switch>
        );
    }
}


export default withRouter(App);
