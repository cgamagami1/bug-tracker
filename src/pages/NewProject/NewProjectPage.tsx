import { Link } from "react-router-dom";
import ProjectMenu from "../../components/ProjectMenu";

const NewProjectPage = () => {
  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/newproject">New Project</Link></h2>

      <ProjectMenu />
    </div>
  );
}

export default NewProjectPage;