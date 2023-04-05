import DetailsCard from "../../components/DetailsCard";
import PageRow from "../../components/PageRow";
import { Link, useParams } from "react-router-dom";
import TicketHistoryTable from "./TicketHistoryTable";
import CommentsTable from "./CommentsTable";

const TicketPage = () => {
  const { ticketId } = useParams();

  if (!ticketId) return (
    <div>
      This ticket does not exist
    </div>
  );

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link> &gt; <Link to={`/tickets/${ticketId}`}>This Ticket</Link></h2>

      <PageRow>
        <DetailsCard itemName="Ticket" />
        <TicketHistoryTable />
      </PageRow>
      <PageRow>
        <CommentsTable />
      </PageRow>
    </div>
  );
}

export default TicketPage;