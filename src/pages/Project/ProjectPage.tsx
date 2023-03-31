import { useParams, Link } from "react-router-dom";
import UsersTable from "./UsersTable";
import TicketsTable from "./TicketsTable";

const ProjectPage = () => {
  const { projectName } = useParams();

  return (
    <div className="bg-gray-100 flex-grow p-4 md:p-8 text-gray-700">
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectName}`}>{ projectName }</Link></h2>

      <div className="flex flex-col 2xl:flex-row gap-8 justify-between items-stretch 2xl:items-start">
        <UsersTable />
        <TicketsTable />
      </div>
    </div>
  );
}

export default ProjectPage;