import "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Lockoin-logo.png";

function Navbar() {
  return (
    <>
      <nav className=" w-full px-6 h-20 flex items-center justify-between bg-white  sticky ">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Lockoin Logo" className="h-10" />
        </Link>
        <div className="hidden md:flex justify-center items-center space-x-8">
          <Link to="/About" className="flex items-center gap-1">
            <p>About us</p>
          </Link>
          <Link to="/WhatWeOffer" className="flex items-center gap-1">
            <p>What we offer</p>
          </Link>
          <Link to="/Support" className="flex items-center gap-1">
            <p>Support</p>
          </Link>
        </div>
        <div className="flex justify-center gap-4">
          <Link to="/GetStarted" className="flex justify-end">
            <button className="rounded-3xl border-none bg-lime-300 px-4 py-2 font-bold hover:bg-lime-200">
              Sign up
            </button>
          </Link>
          <Link to="/Login" className="flex justify-end">
            <button className="rounded-3xl border-none bg-lime-300 px-4 py-2 font-bold hover:bg-lime-200">
              Log In
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
