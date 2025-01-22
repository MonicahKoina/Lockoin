// PocketBaseProvider.js
import "react";
import PocketBaseContext from "./PocketBaseContext";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// eslint-disable-next-line react/prop-types
const PocketBaseProvider = ({ children }) => {
  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
};

export default PocketBaseProvider;
