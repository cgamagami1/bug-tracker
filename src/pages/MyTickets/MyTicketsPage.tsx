import { Link } from "react-router-dom";
import TicketsTable from "../../components/TicketsTable";

const MyTicketsPage = () => {
  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link></h2>

      <TicketsTable entriesPerPage={15} />
    </div>
  );
}

export default MyTicketsPage;