import DetailsCard from "../../components/DetailsCard";
import DetailsCardItem from "../../components/DetailsCardItem";
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
        <DetailsCard title="Work on new thing">
          <DetailsCardItem name="Description" value="Value" />
          <DetailsCardItem name="Project" value="Value" />
          <DetailsCardItem name="Developer" value="Value" />
          <DetailsCardItem name="Submitter" value="Value" />
          <DetailsCardItem name="Status" value="Value" />
          <DetailsCardItem name="Priority" value="Value" />
          <DetailsCardItem name="Type" value="Value" />
          <DetailsCardItem name="Date Created" value="Value" />
        </DetailsCard>
        <TicketHistoryTable />
      </PageRow>
      <PageRow>
        <CommentsTable />
      </PageRow>
    </div>
  );
}

export default TicketPage;