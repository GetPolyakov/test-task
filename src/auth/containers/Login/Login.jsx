import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../../../shared/components/Button/Button'

import AuthService from '../../services/service.auth';

import './Login.scss';

class Login extends Component {

    onLogin = () => {
        AuthService.onLogin()
    }

    render() {
        return (
            <div className="login d-flex justify-content-center align-items-center">
                <Button
                    text="Login with Yandex"
                    onClick={this.onLogin}
                    type="button"/>

            </div>
        );
    }
}

 Login.propTypes = {};

export default  Login;


