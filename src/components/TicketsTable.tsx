import { DateTime } from "luxon";
import TableContainer from "./TableContainer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableData from "./TableData";
import useTable from "../utils/useTable";
import { ROLE } from "../pages/Project/UsersTable";
import { Link } from "react-router-dom";

export enum STATUS {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  CLOSED = "Closed"
}

export enum PRIORITY {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

export type Ticket = {
  id: number;
  title: string;
  submitterId: number;
  developerId: number;
  status: STATUS;
  priority: PRIORITY;
  dateCreated: DateTime;
}

type TicketsTableProps = {
  entriesPerPage?: number;
}

const TicketsTable = ({ entriesPerPage = 5 }: TicketsTableProps) => {
  const tickets = [
    {
      id: 0,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 1,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 2,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 3,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 4,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 5,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 6,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 7,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 8,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 9,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 10,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 11,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 12,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 13,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 14,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 15,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 16,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
    {
      id: 17,
      title: "Do thing",
      submitterId: 0,
      developerId: 1,
      status: STATUS.IN_PROGRESS,
      priority: PRIORITY.MEDIUM,
      dateCreated: DateTime.now()
    },
  ];
  const users = [
    {
      id: 0,
      name: "Johnathan",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 1,
      name: "john",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 2,
      name: "Johnathan",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 3,
      name: "john",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
  ]

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
            <TableHeader title="Priority" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="priority" />
            <TableHeader title="Date Created" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="dateCreated" hideOnMobile />
          </tr>
        </thead>

        <tbody>
          {
            sortedEntries.map(ticket => (
              <TableRow key={ticket.id}>
                <TableData>{ ticket.title }</TableData>
                <TableData hideOnMobile>{ users.find((user) => user.id === ticket.submitterId)?.name }</TableData>
                <TableData hideOnMobile>{ users.find(user => user.id === ticket.developerId)?.name }</TableData>
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