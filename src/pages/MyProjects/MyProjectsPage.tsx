import { Link } from "react-router-dom";
import ProjectsTable from "./ProjectsTable";
import Button, { BUTTON_STYLES } from "../../components/Button";

const MyProjectsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link></h2>
        
        <Link to="/newproject">
          <Button title="Add Project" style={BUTTON_STYLES.ADD_ITEM} />
        </Link>
      </div>

      <ProjectsTable />
    </div>
  );
}

export default MyProjectsPage;