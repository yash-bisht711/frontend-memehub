import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.app);

  if (isLoading) return <div className="text-white p-4">Loading...</div>;
  if (!user) return <Navigate to="/auth" />;

  return children;
};

export default ProtectedRoute;
