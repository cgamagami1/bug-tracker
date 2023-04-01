import { useParams, Link } from "react-router-dom";
import UsersTable from "./UsersTable";
import TicketsTable from "../../components/TicketsTable";
import DetailsCard from "../../components/DetailsCard";
import Page from "../../components/Page";
import PageRow from "../../components/PageRow";

const ProjectPage = () => {
  const { projectName } = useParams();

  if (!projectName) return (
    <div>
      This project does not exist
    </div>
  );

  return (
    <Page>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectName}`}>{ projectName }</Link></h2>

      <PageRow>
        <DetailsCard itemName={projectName} />
        <UsersTable />
      </PageRow>
      <TicketsTable />
    </Page>
  );
}

export default ProjectPage;