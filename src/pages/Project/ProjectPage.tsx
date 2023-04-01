import { useParams, Link } from "react-router-dom";
import UsersTable from "./UsersTable";
import TicketsTable from "../../components/TicketsTable";
import ProjectDetails from "./ProjectDetails";

const ProjectPage = () => {
  const { projectName } = useParams();

  if (!projectName) return;

  return (
    <div className="bg-gray-100 flex-grow p-4 md:p-8 text-gray-700">
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectName}`}>{ projectName }</Link></h2>

      <div className="flex flex-col xl:flex-row gap-8 justify-between items-stretch mb-8">
        <ProjectDetails projectName={projectName} />
        <UsersTable />
      </div>
      <TicketsTable />
    </div>
  );
}

export default ProjectPage;