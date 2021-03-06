import React, {Component} from 'react';

import { Button } from '../../../shared/components/Button/Button'

import { AuthService } from '../../services/service.auth'

import './Login.scss';

export class Login extends Component {

    onLogin = () => {
        AuthService.redirectToLogin();
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
