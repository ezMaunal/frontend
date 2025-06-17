import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import Login from "@/sidepanel/pages/Login";
import LoginPopup from "@/sidepanel/pages/Login/LoginPopup";
import MainPage from "@/sidepanel/pages/MainPage";
import ProtectedRoute from "@/sidepanel/pages/ProtectedRoute";
import Repository from "@/sidepanel/pages/Repository";
import Settings from "@/sidepanel/pages/Settings";
import DeleteAccount from "@/sidepanel/pages/Settings/DeleteAccount";
import NoticeDeleteAccount from "@/sidepanel/pages/Settings/DeleteAccount/NoticeDeleteAccount";
import Option from "@/sidepanel/pages/Settings/Option";
import TaskBoard from "@/sidepanel/pages/Taskboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLoggedIn(true);

    const handleMessage = (event) => {
      if (event.data?.token) {
        localStorage.setItem("accessToken", event.data.token);
        setIsLoggedIn(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/login-popup"
        element={<LoginPopup />}
      />
      <Route
        element={
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      >
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/repository"
          element={<Repository />}
        />
        <Route
          path="/taskboard"
          element={<TaskBoard />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route
          path="/deleteaccount"
          element={<DeleteAccount />}
        />
        <Route
          path="/noticedeleteaccount"
          element={<NoticeDeleteAccount />}
        />
        <Route
          path="/option"
          element={<Option />}
        />
      </Route>
    </Routes>
  );
};

export default App;
