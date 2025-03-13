
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePOS } from '@/context/POSContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = usePOS();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login while saving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
