// PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const location = useLocation();

  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" state={{form: location}}replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
