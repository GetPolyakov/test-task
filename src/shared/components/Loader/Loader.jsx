import React from 'react';

const Loader = props => {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;
