import React from 'react';
import { useAuth } from './Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (user === undefined) {
    return <div>Loading...</div>; // Show a loading state until the user state is determined
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;






 






