import { Link } from "react-router-dom";
import TicketMenu from "../../components/TicketMenu";
import { useContext } from "react";
import { ProjectContext, ROLE } from "../../context/ProjectContext";

const NewTicketPage = () => {
  const { projects, hasRole } = useContext(ProjectContext);
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