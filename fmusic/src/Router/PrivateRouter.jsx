import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Components/AuthContext';

const PrivateRouter = () => {
  const { accessToken } = useContext(AuthContext);

  console.log("Access Token in PrivateRouter:", accessToken); // Debugging

  if (!accessToken) {
    console.log("User not authenticated. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRouter;
