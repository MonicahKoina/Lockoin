import { useState } from "react";
import { useNavigate } from "react-router-dom";
import slide from "/assets/Lockoin-side-image1.png";
import { Button } from "antd";

const GetStarted = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (role === "buyer") {
      navigate("/SignupBuyer");
    } else if (role === "seller") {
      navigate("/SignupSeller");
    } else {
      alert("Please select a role to continue.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Left Side: Image (Hidden on small screens) */}
      <div className="hidden sm:block sm:flex-1">
        <img src={slide} alt="Slide" className="w-full h-full object-cover" />
      </div>

      {/* Right Side: Content */}
      <div className="flex-1 flex flex-col justify-center items-center sm:items-start bg-white p-6 sm:p-16 space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
          Hello
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left mb-4">
          Let us get you started
        </h2>
        <p className="text-sm sm:text-base text-gray-700 text-center sm:text-left">
          Let us get started by knowing who you are:
        </p>

        <div className="w-full space-y-6">
          {/* Buyer Role */}
          <label className="flex flex-col items-start space-y-2 w-full">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="buyer"
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 border-gray-300"
              />
              <span className="text-sm sm:text-lg font-medium">
                I am a Buyer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 pl-6">
              Ensure your satisfaction by sending money to a secure Lockoin
              account until you receive your product. Shop locally and globally
              from your computer or mobile device without sharing your financial
              information with sellers or risking scams.
            </p>
          </label>

          {/* Seller Role */}
          <label className="flex flex-col items-start space-y-2 w-full">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="seller"
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 border-gray-300"
              />
              <span className="text-sm sm:text-lg font-medium">
                I am a Seller
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 pl-6">
              Reach buyers worldwide and ensure secure transactions with
              Lockoin. Focus on growing your business while protecting your
              revenue from fraudulent activities.
            </p>
          </label>

          {/* Buttons */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full sm:w-3/4 text-black font-semibold py-3 rounded-lg shadow-md"
            >
              Sign up
            </Button>
            <Button
              type="dashed"
              onClick={handleBack}
              className="w-full sm:w-3/4 text-black font-semibold py-3 rounded-lg shadow-md"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
