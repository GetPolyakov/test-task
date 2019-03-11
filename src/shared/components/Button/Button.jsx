import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'
const Button = ({ text, type='button', onClick}) => {
    return (
        <button
            type={type}
            className="button"
            onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    
};

export default Button;