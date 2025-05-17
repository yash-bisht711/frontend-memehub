import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.app);

  useEffect(() => {
    if (isLoading) return <div className="text-white p-4">Loading...</div>;
    if (!user) return navigate("/login");
  }, [user]);

  return children;
};

export default PrivateRoute;
