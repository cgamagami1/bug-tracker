import { useParams, Link } from "react-router-dom";
import TeamMemberTable from "./TeamMemberTable";
import TicketsTable from "../../components/TicketsTable";
import DetailsCard from "../../components/DetailsCard";
import DetailsCardItem from "../../components/DetailsCardItem";
import PageRow from "../../components/PageRow";
import { useContext } from "react";
import { ProjectContext, ROLE } from "../../context/ProjectContext";
import { TicketContext } from "../../context/TicketContext";

const ProjectPage = () => {
  const { projectId } = useParams();
  const { projects, hasRole } = useContext(ProjectContext);
  const { tickets } = useContext(TicketContext);
  const project = projects.find(project => project.id === projectId);
  
  if (!project) return <></>;
  
  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${projectId}`}>{ project.title }</Link></h2>

      <PageRow>
        <DetailsCard title={project.title} canEdit={hasRole(project.id, [ROLE.PROJECT_ADMIN, ROLE.OWNER])}>
          {project.description && <DetailsCardItem name="Description" value={project.description} spanTwoColumns />}
          {project.startDate && <DetailsCardItem name="Start Date" value={project.startDate.toISODate()} />}
          {project.endDate && <DetailsCardItem name="End Date" value={project.endDate.toISODate()} />}
        </DetailsCard>
        <TeamMemberTable projectId={project.id} />
      </PageRow>
      <TicketsTable tickets={tickets} />
    </div>
  );
}

export default ProjectPage;