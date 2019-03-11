import React from 'react';

export const Loader = props => {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};
