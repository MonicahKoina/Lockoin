import "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import GetStarted from "./Pages/GetStarted";
import SignupSeller from "./Pages/SignupSeller";
import SignupBuyer from "./Pages/SignupBuyer";
import PocketBaseProvider from "./pb/PocketBaseProvider";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <PocketBaseProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="GetStarted" element={<GetStarted />} />
            <Route path="SignupSeller" element={<SignupSeller />} />
            <Route path="SignupBuyer" element={<SignupBuyer />} />
          </Routes>
        </PocketBaseProvider>
      </div>
    </>
  );
}

export default App;
