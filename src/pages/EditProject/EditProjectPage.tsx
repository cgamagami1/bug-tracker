import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProjectMenu from "../../components/ProjectMenu";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const EditProjectPage = () => {
  const { projectId } = useParams();
  const { projects } = useContext(ProjectContext);
  const project = projects.find(project => project.id === projectId);

  if (!project) return (
    <div>
      This project does not exist
    </div>
  );

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectId}`}>{ project.title }</Link> &gt; <Link to={`/tickets/${projectId}/edit`}>Edit</Link></h2>

      <ProjectMenu editedItem={project} />
    </div>
  );
}

export default EditProjectPage;