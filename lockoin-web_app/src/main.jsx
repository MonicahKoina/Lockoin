import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { PocketBaseProvider } from "./pb/PocketBaseProvider.jsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      cssVar: true,
      token: {
        colorPrimary: "#32CD32",
      },
    }}
  >
    <PocketBaseProvider>
      <Router>
        <App />
      </Router>
    </PocketBaseProvider>
  </ConfigProvider>
);
