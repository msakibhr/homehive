import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to='/login' state={location?.pathname || '/'} />
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;