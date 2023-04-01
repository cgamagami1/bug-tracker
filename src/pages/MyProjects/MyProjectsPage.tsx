import { Link } from "react-router-dom";
import ProjectsTable from "./ProjectsTable";
import Page from "../../components/Page";

const MyProjectsPage = () => {
  return (
    <Page>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link></h2>

      <ProjectsTable />
    </Page>
  );
}

export default MyProjectsPage;