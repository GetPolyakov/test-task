import React from 'react';
import PropTypes from 'prop-types';

import { FileIcon } from "./FileIcon/FileIcon";

export const File = ({name, size}) => {
    return (
        <div className="file d-flex flex-column">
            <FileIcon />
            <div>{name}</div>
            <div>{size} KB</div>
        </div>
    );
};

File.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number
};
