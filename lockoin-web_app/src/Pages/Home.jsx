import "react";
import Hero from "../assets/Lockoin-hero-slider.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section
        className="h-[100vh] -mt-20 bg-90vh bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-5xl font-medium">
            The simpler and safer way
            <br /> to pay and get paid
            <Link to="/GetStarted" className="flex justify-center">
              <button className=" mt-20 p-2 text-lg text-black rounded-3xl border-none bg-lime-300  hover:bg-lime-200">
                Get Started
              </button>
            </Link>
          </h1>
          <div className="absolute bottom-0 right-0">
            <button className="bg-white text-gray-800 px-6 py-4 rounded-tl-3xl shadow-lg flex items-center space-x-8">
              <div className="text-center">
                <h4 className="text-xl font-bold">15k+</h4>
                <h5 className="text-sm">Users</h5>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold">260+</h4>
                <h5 className="text-sm">Consultants</h5>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold">89+</h4>
                <h5 className="text-sm">Orders in Queue</h5>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
