import { Link } from "react-router-dom";
import TicketMenu from "../../components/TicketMenu";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { TeamMemberContext, ROLE } from "../../context/TeamMemberContext";

const NewTicketPage = () => {
  const { projects } = useContext(ProjectContext);
  const { hasRole } = useContext(TeamMemberContext);
  const submitterProjects = projects.filter(project => hasRole(project.id, [ROLE.SUBMITTER, ROLE.PROJECT_ADMIN, ROLE.OWNER]));

  if (!submitterProjects.length) return <></>;

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/newticket">New Ticket</Link></h2>

      <TicketMenu />
    </div>
  );
}

export default NewTicketPage;