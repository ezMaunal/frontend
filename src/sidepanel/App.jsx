import { Routes, Route } from "react-router-dom";

import MainPage from "@/sidepanel/pages/MainPage";
import Repository from "@/sidepanel/pages/Repository";
import Settings from "@/sidepanel/pages/Settings";
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
    </Routes>
  );
};

export default App;
