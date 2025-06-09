import { Routes, Route } from "react-router-dom";

import MainPage from "@/sidepanel/pages/MainPage";
import Repository from "@/sidepanel/pages/Repository";

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
    </Routes>
  );
};

export default App;
