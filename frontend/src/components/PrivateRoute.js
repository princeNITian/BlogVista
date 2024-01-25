import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("_token") || false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [navigate, location, isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
