import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import TicketMenu from "../../components/TicketMenu";
import useGetTicket from "../../utils/useGetTicket";

const EditTicketPage = () => {
  const { ticketId } = useParams();
  const ticket = useGetTicket(ticketId);

  if (!ticket) return <></>;

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link> &gt; <Link to={`/tickets/${ticketId}`}>This Ticket</Link> &gt; <Link  to={`/tickets/${ticketId}/edit`}>Edit</Link></h2>

      <TicketMenu editedItem={ticket} />
    </div>
  );
}

export default EditTicketPage;