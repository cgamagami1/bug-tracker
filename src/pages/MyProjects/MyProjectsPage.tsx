import { Link } from "react-router-dom";
import ProjectsTable from "./ProjectsTable";

const MyProjectsPage = () => {
  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link></h2>

      <ProjectsTable />
    </div>
  );
}

export default MyProjectsPage;