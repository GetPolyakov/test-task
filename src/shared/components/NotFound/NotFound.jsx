import React from 'react';
import PropTypes from 'prop-types';

import './NotFound.scss'

const NotFound = props => {
    return (
        <div className="not-found d-flex justify-content-center align-items-center">
            Page not found
        </div>
    );
};

NotFound.propTypes = {
    
};

export default NotFound;
