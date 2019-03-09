import React from 'react';
import PropTypes from 'prop-types';

import './File.scss';

const File = ({name, size}) => {
    return (
        <div className="file">
            <span className="glyphicon glyphicon-folder-open"></span>
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
