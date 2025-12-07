import { Navigate } from 'react-router-dom';
import { useAuth } from '@/utils/AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole = null, requiredAnyRole = null }) => {
  const { isAuthenticated, isLoading, hasRole, hasAnyRole } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  if (requiredAnyRole && !hasAnyRole(requiredAnyRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
