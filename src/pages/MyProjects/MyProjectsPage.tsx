import { Link } from "react-router-dom";
import ProjectsTable from "./ProjectsTable";

const MyProjectsPage = () => {
  return (
    <div className="bg-gray-100 flex-grow p-4 md:p-8 text-gray-700">
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link></h2>

      <ProjectsTable />
    </div>
  );
}

export default MyProjectsPage;