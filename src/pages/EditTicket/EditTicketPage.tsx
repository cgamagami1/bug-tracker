import { FormEvent, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import TicketMenu from "../../components/TicketMenu";
import useGetTicket from "../../utils/useGetTicket";
import { ProjectContext } from "../../context/ProjectContext";

const EditTicketPage = () => {
  const { ticketId } = useParams();
  const { projects } = useContext(ProjectContext);
  const ticket = useGetTicket(ticketId);
  const project = projects.find(project => project.id === ticket?.projectId);

  if (!ticket || !project) return <></>;

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${ticket.projectId}`}>{ project.title }</Link> &gt; <Link to={`/tickets/${ticketId}`}>{ ticket.title }</Link> &gt; <Link  to={`/tickets/${ticketId}/edit`}>Edit</Link></h2>
      <TicketMenu editedItem={ticket} />
    </div>
  );
}

export default EditTicketPage;