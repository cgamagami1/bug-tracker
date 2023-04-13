import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MyProjectsPage from "./pages/MyProjects/MyProjectsPage";
import MyTicketsPage from "./pages/MyTickets/MyTicketsPage";
import ProjectPage from "./pages/Project/ProjectPage";
import TicketPage from "./pages/Ticket/TicketPage";
import EditTicketPage from "./pages/EditTicket/EditTicketPage";
import EditProjectPage from "./pages/EditProject/EditProjectPage";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import NewProjectPage from "./pages/NewProject/NewProjectPage";
import NewTicketPage from "./pages/NewTicket/NewTicketPage";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<MyProjectsPage />} />
        <Route path="projects/:projectId" element={<ProjectPage />} />
        <Route path="projects/:projectId/edit" element={<EditProjectPage />} />
        <Route path="newproject" element={<NewProjectPage />} />
        <Route path="tickets" element={<MyTicketsPage />} />
        <Route path="tickets/:ticketId" element={<TicketPage />} />
        <Route path="tickets/:ticketId/edit" element={<EditTicketPage />} />
        <Route path="newticket" element={<NewTicketPage />} />
        <Route path="manage" element={<div>Manage Users</div>} />
        <Route path="settings" element={<div>Settings</div>} />
      </Route>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;