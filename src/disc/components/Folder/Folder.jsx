import React from 'react';
import PropTypes from 'prop-types';

import './Folder.scss'
const Folder = ({ id, name, onFolderClicked }) => {
    return (
        <div className="folder" onClick={() => onFolderClicked(id)}>
            <span className="glyphicon glyphicon-folder-open"></span>
            {name}
        </div>
    );
};

Folder.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,

    onFolderClicked: PropTypes.func
};

export default Folder;
