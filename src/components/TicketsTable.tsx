import TableContainer from "./TableContainer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableData from "./TableData";
import useTable from "../utils/useTable";
import { Link } from "react-router-dom";
import { Ticket } from "../context/TicketContext";
import { useState } from "react";
import StatusMenu from "../pages/Ticket/StatusMenu";

type TicketsTableProps = {
  entriesPerPage?: number;
  tickets: Ticket[];
}

const TicketsTable = ({ entriesPerPage = 5, tickets }: TicketsTableProps) => {
  const [statusMenuTicket, setStatusMenuTicket] = useState<Ticket | null>(null);

  const { 
    sortedEntries, 
    sortAlgorithm, 
    setSortAlgorithm, 
    currentPage, 
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(tickets, entriesPerPage);

  const handleOnCloseStatusMenu = () => {
    setStatusMenuTicket(null);
  }

  return (
    <TableContainer title="Tickets" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo}>
      <table>
        <thead>
          <tr>
            <TableHeader title="Title" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="title" />
            <TableHeader title="Submitter" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="submitterId" hideOnMobile />
            <TableHeader title="Developer" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="developerId" hideOnMobile />
            <TableHeader title="Status" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="status" />
            <TableHeader title="Priority" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="priority" hideOnMobile />
            <TableHeader title="Date Created" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="dateCreated" hideOnMobile />
          </tr>
        </thead>

        <tbody>
          {
            sortedEntries.map(ticket => (
              <TableRow key={ticket.id}>
                <TableData>{ ticket.title }</TableData>
                <TableData hideOnMobile>{ ticket.submitterName }</TableData>
                <TableData hideOnMobile>{ ticket.developerName }</TableData>
                <TableData>{ ticket.status }</TableData>
                <TableData hideOnMobile>{ ticket.priority }</TableData>
                <TableData hideOnMobile>{ ticket.dateCreated.toISODate() }</TableData>
                <TableData>
                  <div className="flex flex-col">
                    <Link className="hover:underline text-purple-700" to={`/tickets/${ticket.id}`}>More Details</Link>
                    <span className="hover:underline text-purple-700 hover:cursor-pointer" onClick={() => setStatusMenuTicket(ticket)}>Set Status</span>
                  </div>
                </TableData>
              </TableRow>
            ))
          }
        </tbody>
      </table>
      {statusMenuTicket && <StatusMenu ticket={statusMenuTicket} handleOnCloseMenu={handleOnCloseStatusMenu} />}
    </TableContainer>
  );
}

export default TicketsTable;