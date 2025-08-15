import React from "react";
import { Navigate  } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const { user } = useContext(AuthContext);

    // Not logged in redirect to login
    if(!user) return <Navigate to="/login" replace />

    // Logged in but role not allowed redirect home
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
    return children;
};