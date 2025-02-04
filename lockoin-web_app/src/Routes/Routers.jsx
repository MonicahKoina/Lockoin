import "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import GetStarted from "../Pages/GetStarted/GetStarted";
import SignupSeller from "../components/Seller/SignupSeller";
import SignupBuyer from "../components/Buyer/SignupBuyer";
import About from "../Pages/About/About";
import Features from "../Pages/Features/Features";
import Login from "../Pages/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import ProtectedRoute from "../components/private/Private";
import BuyerDashboard from "../components/Buyer/BuyerDashboard";
import CreateOrder from "../components/Buyer/CreateOrder";
import BuyerDispute from "../components/Buyer/BuyerDispute";
import SellerOrders from "../components/Seller/SellerOrders";
import Layout from "../Layout/Layout";
import Support from "../Pages/support/Support";
import AdminLayout from "../Layout/AdminLayout";
import Notification from "../components/Seller/Notification";
import OrderVerification from "../components/Buyer/OrderVerification";
import MyOrders from "../components/Buyer/MyOrders";
import SellerDashboard from "../components/Seller/SellerDashboard";
import SellerDispute from "../components/Seller/SellerDispute";

function Routers() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/features" element={<Features />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/signupseller" element={<SignupSeller />} />
      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/signupbuyer" element={<SignupBuyer />} />
      <Route path="/login" element={<Login />} />

      {/* Buyer Protected Routes */}
      <Route path="/" element={<AdminLayout />}>
        <Route
          path="/dashboard"
          index
          element={
            <ProtectedRoute>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateOrder"
          element={
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/disputes"
          element={
            <ProtectedRoute>
              <BuyerDispute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderverification"
          element={
            <ProtectedRoute>
              <OrderVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Seller Protected Routes */}
        <Route
          path="/SellerDashboard"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <SellerOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SellerDispute"
          element={
            <ProtectedRoute>
              <SellerDispute />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Routers;
