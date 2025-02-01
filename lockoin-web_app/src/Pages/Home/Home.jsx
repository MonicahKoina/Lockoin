import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Hero from "/assets/Lockoin-hero-slider.png";

const Home = () => {
  return (
    <section
      className="relative h-[calc(100vh-80px)] bg-cover bg-center flex items-center justify-center px-6"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          The simpler and safer way
          <br /> to pay and get paid
        </h1>

        {/* Get Started Button */}
        <Link to="/GetStarted">
          <Button
            type="primary"
            size="large"
            shape="round"
            className="mt-10"
            style={{ backgroundColor: "limegreen", borderColor: "limegreen" }}
          >
            Get Started <ArrowRightOutlined />
          </Button>
        </Link>
      </div>

      {/* Stats Button (Same Design, Fully Responsive) */}
      <div className="absolute bottom-0 right-0 w-full md:w-auto">
        <button className="bg-white text-gray-800 px-6 py-4 rounded-tl-3xl shadow-lg flex flex-wrap md:flex-nowrap items-center justify-center space-x-6">
          <div className="text-center min-w-[90px]">
            <h4 className="text-xl font-bold">15k+</h4>
            <h5 className="text-sm">Users</h5>
          </div>
          <div className="text-center min-w-[90px]">
            <h4 className="text-xl font-bold">260+</h4>
            <h5 className="text-sm">Consultants</h5>
          </div>
          <div className="text-center min-w-[90px]">
            <h4 className="text-xl font-bold">89+</h4>
            <h5 className="text-sm">Orders in Queue</h5>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Home;
