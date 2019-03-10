import React from 'react';
import PropTypes from 'prop-types';

import './Resource.scss'
const Resource = ({ children }) => {
    return (
        <div className="resource">
            { children }
        </div>
    );
};

Resource.propTypes = {
   children: PropTypes.object
};

export default Resource;
