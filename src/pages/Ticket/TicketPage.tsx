import DetailsCard from "../../components/DetailsCard";
import DetailsCardItem from "../../components/DetailsCardItem";
import PageRow from "../../components/PageRow";
import { Link, useParams } from "react-router-dom";
import TicketHistoryTable from "./TicketHistoryTable";
import CommentsTable from "./CommentsTable";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { TeamMemberContext } from "../../context/TeamMemberContext";
import { TicketContext } from "../../context/TicketContext";

const TicketPage = () => {
  const { ticketId } = useParams();
  const { projects } = useContext(ProjectContext);
  const { teamMembers } = useContext(TeamMemberContext);
  const { tickets } = useContext(TicketContext);
  const ticket = tickets.find(ticket => ticket.id === ticketId);
  const project = projects.find(project => project.id === ticket?.projectId);

  if (!ticket || !project) return <></>;

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/projects">My Projects</Link> &gt; <Link to={`/projects/${ticket.projectId}`}>{ project.title }</Link> &gt; <Link to={`/tickets/${ticketId}`}>{ ticket.title }</Link></h2>
      <PageRow>
        <DetailsCard title={ticket.title}>
          {ticket.description && <DetailsCardItem name="Description" value={ticket.description} />}
          <DetailsCardItem name="Project" value={project.title ?? ""} />
          <DetailsCardItem name="Developer" value={teamMembers.find(teamMember => teamMember.userId === ticket.developerId)?.fullName ?? ""} />
          <DetailsCardItem name="Submitter" value={teamMembers.find(teamMember => teamMember.userId === ticket.submitterId)?.fullName ?? ""} />
          <DetailsCardItem name="Status" value={ticket.status} />
          <DetailsCardItem name="Priority" value={ticket.priority} />
          <DetailsCardItem name="Type" value={ticket.type} />
          <DetailsCardItem name="Date Created" value={ticket.dateCreated.toISODate()} />
        </DetailsCard>
        <TicketHistoryTable ticketId={ticket.id} />
      </PageRow>
      <PageRow>
        <CommentsTable ticketId={ticket.id} />
      </PageRow>
    </div>
  );
}

export default TicketPage;