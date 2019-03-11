import React from 'react';
import PropTypes from 'prop-types';

import FolderIcon from "./FolderIcon/FolderIcon";

import './Folder.scss'

export const Folder = ({ id, name, onFolderClicked }) => {
    return (
        <div className="folder d-flex flex-column" onClick={() => onFolderClicked(id)}>
            <FolderIcon/>
            <div>{name}</div>
        </div>
    );
};

Folder.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,

    onFolderClicked: PropTypes.func
};
