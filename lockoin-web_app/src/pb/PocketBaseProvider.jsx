import { createContext, useContext } from "react";
import PocketBase from "pocketbase";

const PocketBaseContext = createContext(null);
const pb = new PocketBase("http://127.0.0.1:8090");

// 🔹 Custom Hook: Makes it easy to use PocketBase in any component
const usePocketBase = () => {
  const context = useContext(PocketBaseContext);
  if (!context) {
    throw new Error("usePocketBase must be used within a PocketBaseProvider");
  }
  return context;
};

// 🔹 Provider Component
const PocketBaseProvider = ({ children }) => {
  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
};

// ✅ Export both the Provider & the Hook
export { PocketBaseProvider, usePocketBase };
