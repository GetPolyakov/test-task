import React from 'react';
import PropTypes from 'prop-types';

import './File.scss';

const File = ({name, size}) => {
    return (
        <div className="file">
            <i className="fa fa-file"></i>
            <div>{name}</div>
            <div>{size} KB</div>
        </div>
    );
};

File.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number
};

export default File;
