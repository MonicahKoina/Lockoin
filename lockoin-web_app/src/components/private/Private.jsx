import "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("pocketbase_auth"));

  if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
