import { useParams, Link } from "react-router-dom";
import UsersTable from "./UsersTable";
import TicketsTable from "../../components/TicketsTable";
import ProjectDetails from "./ProjectDetails";
import Page from "../../components/Page";

const ProjectPage = () => {
  const { projectName } = useParams();

  if (!projectName) return;

  return (
    <Page>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectName}`}>{ projectName }</Link></h2>

      <div className="flex flex-col xl:flex-row gap-8 justify-between items-stretch xl:items-start mb-8">
        <ProjectDetails projectName={projectName} />
        <UsersTable />
      </div>
      <TicketsTable />
    </Page>
  );
}

export default ProjectPage;