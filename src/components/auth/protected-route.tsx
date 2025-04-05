
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'student' | 'recruiter')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const location = useLocation();
  
  // This is a placeholder for actual authentication logic
  // In a real application, this would check your backend/auth service
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole') as 'admin' | 'student' | 'recruiter' | null;
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  if (userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard if authenticated but wrong role
    if (userRole === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    } else {
      return <Navigate to="/dashboard/student" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
