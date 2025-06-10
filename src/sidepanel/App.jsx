import { Routes, Route } from "react-router-dom";

import Login from "@/sidepanel/pages/Login";
import MainPage from "@/sidepanel/pages/MainPage";
import Repository from "@/sidepanel/pages/Repository";
import Settings from "@/sidepanel/pages/Settings";
import DeleteAccount from "@/sidepanel/pages/Settings/DeleteAccount";
import NoticeDeleteAccount from "@/sidepanel/pages/Settings/DeleteAccount/NoticeDeleteAccount";
import Option from "@/sidepanel/pages/Settings/Option";
import TaskBoard from "@/sidepanel/pages/Taskboard";

const App = () => {
  return (
    <Routes>
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
        path="/login"
        element={<Login />}
      />
      <Route
        path="/option"
        element={<Option />}
      />
    </Routes>
  );
};

export default App;
