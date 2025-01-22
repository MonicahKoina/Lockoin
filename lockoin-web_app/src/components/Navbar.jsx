import "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Lockoin-logo.png";

function Navbar() {
  return (
    <>
      <nav className="w-full px-3 flex items-center justify-between h-20 mx-auto md:w-[95%] border-b-2">
        <Link to="/" className="flex flex-row-reverse items-end text-sm">
          <img src={Logo} alt="Lockoin Logo" className="h-10" />
        </Link>
        <div className="hidden md:flex justify-center items-center w-1/3 space-x-8">
          <Link to="About" className="flex items-center gap-1">
            <p>About us</p>
          </Link>
          <Link to="Support" className="flex items-center gap-1">
            <p>What we offer</p>
          </Link>
          <Link to="Support" className="flex items-center gap-1">
            <p>Support</p>
          </Link>
        </div>
        <Link to="GetStarted" className="flex justify-end">
          <button className="rounded-3xl border border-none bg-lime-300 px-4 py-2 font-bold hover:bg-lime-200">
            Get Started
          </button>
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
