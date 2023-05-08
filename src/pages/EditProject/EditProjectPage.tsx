import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProjectMenu from "../../components/ProjectMenu";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { ROLE, TeamMemberContext } from "../../context/TeamMemberContext";

const EditProjectPage = () => {
  const { projectId } = useParams();
  const { projects } = useContext(ProjectContext);
  const { hasRole } = useContext(TeamMemberContext);
  const project = projects.find(project => project.id === projectId);

  if (!project || !hasRole(project.id, [ROLE.PROJECT_ADMIN, ROLE.OWNER])) return <></>;

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectId}`}>{ project.title }</Link> &gt; <Link to={`/tickets/${projectId}/edit`}>Edit</Link></h2>

      <ProjectMenu editedItem={project} />
    </div>
  );
}

export default EditProjectPage;