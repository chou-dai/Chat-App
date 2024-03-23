import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import Signup from "@/pages/Signup";
import Loign from "@/pages/Login";
import Chat from "./pages/Chat";
import store from "./redux/config/store";
import AuthWrapper from "@/component/layout/AuthWrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/configs/firebase";
import "@/style/index.css";
import "@/style/pages/Chat.css";

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
