import React, { Component } from 'react';

import './ErrorBoundary.scss';

export class ErrorBoundary extends Component {
        state = {
            hasError: false
        };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2 className="error-boundary__message">Something went wrong.</h2>
                </div>
            );
        }
        return this.props.children;
    }
}
