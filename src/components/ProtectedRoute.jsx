// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    // If role does not match, redirect to their panel
    const redirectPath = user.role === "admin" ? "/admin" : "/menu";
    return <Navigate to={redirectPath} />;
  }

  // If authenticated and authorized, render the page
  return children;
}

export default ProtectedRoute;

