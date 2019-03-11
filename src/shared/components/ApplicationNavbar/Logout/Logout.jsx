import React from 'react';
import PropTypes from 'prop-types';

import './Logout.scss';

export const Logout = ({ onLogout }) => {
    return (
        <i className="fa fa-sign-out" onClick={ onLogout }></i>
    );
};

Logout.propTypes = {
   onLogout: PropTypes.func
};
