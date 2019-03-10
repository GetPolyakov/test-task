import React from 'react';
import PropTypes from 'prop-types';

import './ApplicationNavbar.scss';

const ApplicationNavbar = ({ text = '', onLogout }) => {
    return (
        <div className="application-navbar d-flex  justify-content-between">
            <div>{ text }</div>
            <i className="fa fa-sign-out" onClick={ onLogout }></i>
        </div>
    );
};

ApplicationNavbar.propTypes = {
    text: PropTypes.string,

    onLogout: PropTypes.func
};

export default ApplicationNavbar;
