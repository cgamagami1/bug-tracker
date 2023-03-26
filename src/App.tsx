import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MyProjectsPage from "./pages/MyProjects/MyProjectsPage";

const App: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<MyProjectsPage />} />
        <Route path="tickets" element={<div>My Tickets</div>} />
        <Route path="manage" element={<div>Manage Users</div>} />
        <Route path="settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
    
  )
}

export default App;