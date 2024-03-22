import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "@/component/pages/Signup";
import Loign from "@/component/pages/Login";
import AuthWrapper from "@/component/layout/AuthWrapper";
import "@/firebase";
import "@/style/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<AuthWrapper><Signup /></AuthWrapper>} />
      <Route
        path="/signup/:groupId"
        element={<AuthWrapper><Signup /></AuthWrapper>} />
      <Route
        path="/login/:groupId"
        element={<AuthWrapper><Loign /></AuthWrapper>}
      />
    </Routes>
  </BrowserRouter>,
);
