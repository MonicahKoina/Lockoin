import "react";
import Hero from "../assets/Lockoin-hero-slider.png";

const HeroPage = () => {
  return (
    <div
      className="h-[87vh] bg-cover bg-center flex items-center justify-center "
      style={{ backgroundImage: `url(${Hero})` }}
    >
      <div className=" text-center text-white">
        <h1 className="text-3xl md:text-5xl font-medium">
          The simpler and safer way to pay and get paid
        </h1>
        <div className="absolute bottom-0 right-0">
          <button className="bg-lime-100 text-gray-800 px-6 py-4 rounded-tl-3xl shadow-lg flex items-center space-x-8">
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
    </div>
  );
};

export default HeroPage;
