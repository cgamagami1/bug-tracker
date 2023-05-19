import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from './context/ProjectContext';
import { TicketProvider } from './context/TicketContext';
import App from './App'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProjectProvider>
          <TicketProvider>
            <App />
          </TicketProvider>
        </ProjectProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
