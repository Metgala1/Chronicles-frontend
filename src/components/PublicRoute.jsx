// PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth?.user) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default PublicRoute;
