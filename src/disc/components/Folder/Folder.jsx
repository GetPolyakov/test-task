import React from 'react';
import PropTypes from 'prop-types';

import './Folder.scss'
const Folder = ({ id, name, onFolderClicked }) => {
    return (
        <div className="folder d-flex flex-column" onClick={() => onFolderClicked(id)}>
            <i className="fa fa-folder"></i>
            <div>{name}</div>
        </div>
    );
};

Folder.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,

    onFolderClicked: PropTypes.func
};

export default Folder;
