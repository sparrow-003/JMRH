import { Link, Navigate, useLocation } from 'react-router-dom';
import { useJMRH, UserRole } from '@/context/JMRHContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { currentUser } = useJMRH();
    const location = useLocation();

    if (!currentUser) {
        // Redirect to the appropriate login page based on the path
        const loginPath = location.pathname.startsWith('/secure/admin')
            ? '/secure/admin/login'
            : location.pathname.startsWith('/secure/professor')
                ? '/secure/professor/login'
                : '/login';

        return <Navigate to={loginPath} state={{ from: location }} replace />;
    }

    if (currentUser.status === 'BANNED') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6 text-center">
                <div className="max-w-md space-y-6">
                    <h1 className="text-4xl font-serif font-bold text-oxford">Account Banned</h1>
                    <p className="text-text-muted italic">
                        Your account has been deactivated by the administrator for policy violations.
                        Please contact the editorial desk for further inquiries.
                    </p>
                    <Link
                        className="inline-flex items-center justify-center rounded-md bg-oxford px-4 py-2 text-sm font-semibold text-white transition hover:bg-oxford/90"
                        to="/login"
                    >
                        Return to login
                    </Link>
                </div>
            </div>
        );
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
