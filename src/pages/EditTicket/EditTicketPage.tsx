import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import TicketMenu from "../../components/TicketMenu";

const EditTicketPage = () => {
  const { ticketId } = useParams();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link> &gt; <Link to={`/tickets/${ticketId}`}>This Ticket</Link> &gt; <Link  to={`/tickets/${ticketId}/edit`}>Edit</Link></h2>

      <TicketMenu />
    </div>
  );
}

export default EditTicketPage;