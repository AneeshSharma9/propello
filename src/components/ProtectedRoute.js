import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AccountContext } from './Account';

function ProtectedRoute({ children }) {
    const { user, initializing } = useContext(AccountContext);

    if (initializing) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;