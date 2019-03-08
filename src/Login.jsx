import React, {Component} from 'react';
import PropTypes from 'prop-types';

const AUTH_URL = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${process.env.REACT_APP_YANDEX_CLIENT_ID}`;
const TOKEN_PARAM = 'access_token';

class Login extends Component {
    state = {
        token: null
    }


    onLogin = () => {
        const { token } = this.state;
        const { history } = this.props;
        window.location = AUTH_URL;
    }

    render() {
        return (
            <div>
                <div>
                    <button
                        onClick={this.onLogin}
                        type="button">
                        login
                    </button>
                </div>
            </div>
        );
    }
}

 Login.propTypes = {};

export default  Login;


