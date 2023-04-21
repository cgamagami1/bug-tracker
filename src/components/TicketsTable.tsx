import TableContainer from "./TableContainer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableData from "./TableData";
import useTable from "../utils/useTable";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Ticket } from "../context/TicketContext";
import { TeamMemberContext } from "../context/TeamMemberContext";

type TicketsTableProps = {
  entriesPerPage?: number;
  tickets: Ticket[];
}

const TicketsTable = ({ entriesPerPage = 5, tickets }: TicketsTableProps) => {
  const { teamMembers } = useContext(TeamMemberContext);

  const { 
    sortedEntries, 
    sortAlgorithm, 
    setSortAlgorithm, 
    currentPage, 
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(tickets, entriesPerPage);
  
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
                <TableData hideOnMobile>{ teamMembers.find(teamMember => teamMember.userId === ticket.submitterId)?.fullName }</TableData>
                <TableData hideOnMobile>{ teamMembers.find(teamMember => teamMember.userId === ticket.developerId)?.fullName }</TableData>
                <TableData>{ ticket.status }</TableData>
                <TableData hideOnMobile>{ ticket.priority }</TableData>
                <TableData hideOnMobile>{ ticket.dateCreated.toISODate() }</TableData>
                <TableData>
                  <Link className="hover:underline text-purple-700" to={`/tickets/${ticket.id}`}>More Details</Link>
                </TableData>
              </TableRow>
            ))
          }
        </tbody>
      </table>
    </TableContainer>
  );
}

export default TicketsTable;