import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/common/AuthProvider";

import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <HashRouter basename={"/trify_admin/"}> */}
    <BrowserRouter basename={"/trify_admin/"}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    {/* </HashRouter> */}
  </React.StrictMode>
);
