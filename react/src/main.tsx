import React from "react";
import ReactDOM from "react-dom/client";
import Auth from "@/pages/Auth";
import "@/firebase";
import "@/style/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <React.StrictMode>
            <Auth />
          </React.StrictMode>
        }
      />
    </Routes>
  </BrowserRouter>,
);
