import { Link } from "react-router-dom";
import ProjectsTable from "./ProjectsTable";

const MyProjectsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link></h2>
        <Link to="/newproject" className="border bg-purple-500 text-white rounded-md py-1 px-2 hover:cursor-pointer hover:bg-purple-600">Add Project</Link>
      </div>

      <ProjectsTable />
    </div>
  );
}

export default MyProjectsPage;