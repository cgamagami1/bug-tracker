import { Link } from "react-router-dom";
import TicketMenu from "../../components/TicketMenu";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const NewTicketPage = () => {
  const { projects } = useContext(ProjectContext);

  if (!projects.length) return <></>;

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/newticket">New Ticket</Link></h2>

      <TicketMenu />
    </div>
  );
}

export default NewTicketPage;