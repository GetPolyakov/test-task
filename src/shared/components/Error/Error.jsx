import React from 'react';
import PropTypes from 'prop-types'

import './Error.scss';

export const Error = ({ message }) => {
    return (
        <div className="error">
            {
                <h1 className="error__message">{ message }</h1>
            }
        </div>
    );
};

Error.propTypes = {
    message: PropTypes.string.isRequired
};
