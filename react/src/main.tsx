import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import Signup from "@/component/pages/Signup";
import Loign from "@/component/pages/Login";
import AuthWrapper from "@/component/layout/AuthWrapper";
import "@/configs/firebase";
import "@/style/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./component/pages/Chat";
import store from "./redux/config/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthWrapper>
              <Chat />
            </AuthWrapper>
          }
        />
        <Route
          path="/signup/"
          element={
            <AuthWrapper>
              <Signup />
            </AuthWrapper>
          }
        />
        <Route
          path="/login/"
          element={
            <AuthWrapper>
              <Loign />
            </AuthWrapper>
          }
        />
      </Routes>
    </Provider>
  </BrowserRouter>,
);
