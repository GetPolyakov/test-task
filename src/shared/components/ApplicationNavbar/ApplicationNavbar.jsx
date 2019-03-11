import React from 'react';
import PropTypes from 'prop-types';

import { Logout } from "./Logout/Logout";

import './ApplicationNavbar.scss';

const ApplicationNavbar = ({ text = '', onLogout }) => {
    return (
        <div className="application-navbar d-flex  justify-content-between">
            <div>{ text }</div>
            <Logout onLogout={onLogout}/>
        </div>
    );
};

ApplicationNavbar.propTypes = {
    text: PropTypes.string,

    onLogout: PropTypes.func
};

export default ApplicationNavbar;
