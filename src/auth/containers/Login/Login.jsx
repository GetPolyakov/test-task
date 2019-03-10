import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AuthService from '../../services/service.auth';

class Login extends Component {
    onLogin = () => {
        AuthService.onLogin()
    }

    render() {
        return (
            <div>
                <div>
                    <button
                        onClick={this.onLogin}
                        type="button">

                        Login with Yandex
                    </button>
                </div>
            </div>
        );
    }
}

 Login.propTypes = {};

export default  Login;


