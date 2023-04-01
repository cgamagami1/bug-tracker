import { Link } from "react-router-dom";
import TicketsTable from "../../components/TicketsTable";
import Page from "../../components/Page";

const MyTicketsPage = () => {
  return (
    <Page>
      <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link></h2>

      <TicketsTable entriesPerPage={15} />
    </Page>
  );
}

export default MyTicketsPage;