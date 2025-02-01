import { useState } from "react";
import { useNavigate } from "react-router-dom";
import slide from "../assets/Lockoin-side-image1.png";

const GetStarted = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "buyer") {
      navigate("/SignupBuyer");
    } else if (role === "seller") {
      navigate("/SignupSeller");
    } else {
      alert("Please select a role to continue.");
    }
  };

  return (
    <div className="flex h-[100vh] -mt-20">
      <div className="w-1/2">
        <img src={slide} alt="Slide" className="w-full h-full object-cover" />
      </div>
      <div className="bg-white ml-40 w-1/2 h-full flex flex-col items-start justify-center">
        <h1 className="text-3xl font-bold">Hello</h1>
        <h1 className="text-3xl font-bold mb-8">Let us get you started</h1>
        <p className="mb-6 text-gray-700">
          Let us get started by knowing who you are:
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start space-y-6 w-full"
        >
          <label className="flex flex-col items-start space-y-2 w-3/4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="buyer"
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4  border-gray-300 "
              />
              <span className="text-lg font-medium">I am a Buyer</span>
            </div>
            <p className="text-sm text-gray-600 pl-6">
              Ensure your satisfaction by sending money to a secure escrow
              account until you receive your product. Shop locally and globally
              from your computer or mobile device without sharing your financial
              information with sellers or risking scams.
            </p>
          </label>
          <label className="flex flex-col items-start space-y-2 w-3/4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="seller"
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4  border-gray-300 focus:ring-green-400"
              />
              <span className="text-lg font-medium">I am a Seller</span>
            </div>
            <p className="text-sm text-gray-600 pl-6">
              Reach buyers worldwide and ensure secure transactions with escrow.
              Focus on growing your business while protecting your revenue from
              fraudulent activities.
            </p>
          </label>

          <button
            type="submit"
            className="bg-lime-300 w-3/4 text-black font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
