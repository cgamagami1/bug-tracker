import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MyProjectsPage from "./pages/MyProjects/MyProjectsPage";
import MyTicketsPage from "./pages/MyTickets/MyTicketsPage";
import ProjectPage from "./pages/Project/ProjectPage";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<MyProjectsPage />} />
        <Route path="projects/:projectName" element={<ProjectPage />} />
        <Route path="tickets" element={<MyTicketsPage />} />
        <Route path="manage" element={<div>Manage Users</div>} />
        <Route path="settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
    
  )
}

export default App;