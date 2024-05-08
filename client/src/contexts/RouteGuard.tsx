import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';

interface RouteGuardProps extends RouteProps {
    condition: boolean;
    redirectPath: string;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ condition, redirectPath, ...rest }) => {
    const { isLoggedIn } = useAuth();

    if (condition) {
        return <Route {...rest} />;
    } else {
        return <Navigate to={redirectPath} replace />;
    }
};

export default RouteGuard;
