import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  LockOutlined,
  UserAddOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Logo from "/assets/Lockoin-logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  // useEffect(() => {
  //   const storedUser = JSON.parse(
  //     localStorage.getItem("pocketbase_auth") || "null"
  //   );
  //   setUser(storedUser);
  // }, []);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Lockoin Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/About" className="hover:text-blue-500">
            About us
          </Link>
          <Link to="/features" className="hover:text-blue-500">
            What we offer
          </Link>
          <Link to="/Support" className="hover:text-blue-500">
            Support
          </Link>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex space-x-4">
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            size="large"
            onClick={() => navigate("/GetStarted")}
          >
            Sign up
          </Button>
          <Button
            type="dashed"
            icon={<LockOutlined />}
            size="large"
            onClick={() => navigate("/Login")}
          >
            Log In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-20 left-0 w-full flex flex-col items-center py-6 space-y-4">
          <Link
            to="/About"
            className="hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            About us
          </Link>
          <Link
            to="/features"
            className="hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            What we offer
          </Link>
          <Link
            to="/Support"
            className="hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Support
          </Link>

          <Button
            type="primary"
            icon={<UserAddOutlined />}
            size="large"
            onClick={() => {
              navigate("/GetStarted");
              setIsMenuOpen(false);
            }}
          >
            Sign up
          </Button>
          <Button
            type="dashed"
            icon={<LockOutlined />}
            size="large"
            onClick={() => {
              navigate("/Login");
              setIsMenuOpen(false);
            }}
          >
            Log In
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
