// src/components/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = useSelector((state) => state?.auth?.token);
  const role = useSelector((state) => state?.auth?.user?.role);

  // agar login hi nahi hua
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // agar role allowedRoles mai nahi hai
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
