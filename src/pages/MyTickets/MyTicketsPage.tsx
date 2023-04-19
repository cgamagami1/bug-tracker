import { Link } from "react-router-dom";
import TicketsTable from "../../components/TicketsTable";
import Button, { BUTTON_STYLES } from "../../components/Button";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const MyTicketsPage = () => {
  const { projects } = useContext(ProjectContext);

  return (
    <div>
      <div className="flex justify-between items-start">
        <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link></h2>

        { projects.length > 0 && 
        <Link to="/newticket">
          <Button title="Add Ticket" style={BUTTON_STYLES.ADD_ITEM} />
        </Link> }
      </div>

      <TicketsTable entriesPerPage={15} />
    </div>
  );
}

export default MyTicketsPage;