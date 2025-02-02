import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("pocketbase_auth"));

  if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/login" />;
  }

  // Allow buyer to access routes under "/dashboard" and seller to access routes under "/SellerDashboard"
  if (
    user.record.role === "buyer" &&
    window.location.pathname.includes("/SellerDashboard")
  ) {
    // If buyer tries to access the seller's dashboard or any page related to sellers, redirect them to their dashboard
    return <Navigate to="/dashboard" />;
  }

  if (
    user.record.role === "seller" &&
    window.location.pathname.includes("/dashboard")
  ) {
    // If seller tries to access the buyer's dashboard or any page related to buyers, redirect them to their dashboard
    return <Navigate to="/SellerDashboard" />;
  }

  return children; // If no issues, render the children
};

export default ProtectedRoute;
