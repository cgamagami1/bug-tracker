import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import TicketMenu from "../../components/TicketMenu";
import { ProjectContext } from "../../context/ProjectContext";
import { TicketContext } from "../../context/TicketContext";
import { ROLE, TeamMemberContext } from "../../context/TeamMemberContext";

const EditTicketPage = () => {
  const { ticketId } = useParams();
  const { projects } = useContext(ProjectContext);
  const { tickets } = useContext(TicketContext);
  const { hasRole } = useContext(TeamMemberContext);
  const ticket = tickets.find(ticket => ticket.id === ticketId);
  const project = projects.find(project => project.id === ticket?.projectId);

  if (!ticket || !project || !hasRole(ticket.projectId, [ROLE.SUBMITTER, ROLE.PROJECT_ADMIN, ROLE.OWNER])) return <></>;

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${ticket.projectId}`}>{ project.title }</Link> &gt; <Link to={`/tickets/${ticketId}`}>{ ticket.title }</Link> &gt; <Link  to={`/tickets/${ticketId}/edit`}>Edit</Link></h2>
      <TicketMenu editedItem={ticket} />
    </div>
  );
}

export default EditTicketPage;