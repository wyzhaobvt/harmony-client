import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./css/globals.css";
import "./css/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <main> {/* main will contain <Outlet /> later */}
      <App />
    </main>
  </React.StrictMode>
);
