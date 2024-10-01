import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user from context

  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render children
};

export default ProtectedRoute;
