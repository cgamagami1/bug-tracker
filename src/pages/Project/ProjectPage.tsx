import { useParams, Link } from "react-router-dom";
import UsersTable from "./UsersTable";
import TicketsTable from "../../components/TicketsTable";
import DetailsCard from "../../components/DetailsCard";
import DetailsCardItem from "../../components/DetailsCardItem";
import PageRow from "../../components/PageRow";

const ProjectPage = () => {
  const { projectName } = useParams();

  if (!projectName) return (
    <div>
      This project does not exist
    </div>
  );

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectName}`}>{ projectName }</Link></h2>
      <PageRow>
        <DetailsCard title={projectName}>
          <DetailsCardItem name="Property" value="Value" />
          <DetailsCardItem name="Property" value="Value" />
          <DetailsCardItem name="Property" value="Value" />
          <DetailsCardItem name="Property" value="Value" />
          <DetailsCardItem name="Property" value="Value" />
          <DetailsCardItem name="Property" value="Value" />
          <DetailsCardItem name="Property" value="Value" />
          <DetailsCardItem name="Property" value="Value" />
        </DetailsCard>
        <UsersTable />
      </PageRow>
      <TicketsTable />
    </div>
  );
}

export default ProjectPage;