import "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar remains fixed at the top */}
      <AdminNavbar />

      {/* Main content section */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
