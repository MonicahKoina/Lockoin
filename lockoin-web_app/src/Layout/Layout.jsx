import "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar remains fixed at the top */}
      <Navbar />

      {/* Main content section */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
