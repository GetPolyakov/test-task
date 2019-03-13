import React from 'react';
import PropTypes from 'prop-types'

import './ExpectedError.scss';

export const ExpectedError = ({ message }) => {
    return (
        <div className="expected-error">
            {
                <h1 className="expected-error__message">{ message }</h1>
            }
        </div>
    );
};

ExpectedError.propTypes = {
    message: PropTypes.string.isRequired
};
