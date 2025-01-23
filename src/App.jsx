import "react";
import { Route, Routes } from "react-router-dom";

import GetStarted from "./pages/GetStarted";
import PocketBaseProvider from "./pb/PocketBaseProvider";
import SignupSeller from "./components/SignupSeller";
import SignupBuyer from "./components/SignupBuyer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./components/Navbar";

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
            <Route path="login" element={<Login />} />
          </Routes>
        </PocketBaseProvider>
      </div>
    </>
  );
}

export default App;
