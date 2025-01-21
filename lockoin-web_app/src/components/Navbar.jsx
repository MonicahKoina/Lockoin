import "react";
import logo from "../assets/Lockoin-logo.png";
function Navbar() {
  return (
    <div className="w-full  my-4 flex px-4 h-20 justify-between  flex-wrap">
      <img
        src={logo}
        alt=""
        className="mt-4 mx-8 flex flex-row-reverse items-end h-1/2 "
      />
      <ul className="flex items-center justify-center gap-3 mx-8 h-full">
        <li>About us</li>
        <li>What we offer</li>
        <li>Support</li>
      </ul>
      <div className="flex items-center mx-8 w-1/4 h-full">
        <button className="px-4  border-2 border-lime-300 mx-4 rounded-full w-1/2 h-1/2 ">
          Log In
        </button>
        <button className="px-4  border-2 bg-lime-300 border-none rounded-full w-1/2 h-1/2 ">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
