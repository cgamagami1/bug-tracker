import { DateTime } from "luxon";
import Table from "../../components/Table";
import TableHeader from "../../components/TableHeader";
import useTable from "../../utils/useTable";
import { ROLE } from "./UsersTable";
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

const TicketsTable = () => {
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

  const { sortedEntries, sortAlgorithm, setSortAlgorithm, shownEntries, setShownEntries } = useTable(tickets);

  return (
    <Table title="Tickets" shownEntries={shownEntries} setShownEntries={setShownEntries} totalEntries={tickets.length}>
      <thead>
        <tr>
          <TableHeader title="Title" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="title" />
          <TableHeader title="Submitter" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="submitterId" className="hidden md:table-cell" />
          <TableHeader title="Developer" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="developerId" className="hidden md:table-cell" />
          <TableHeader title="Status" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="status" className="hidden md:table-cell" />
          <TableHeader title="Priority" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="priority" className="hidden md:table-cell" />
          <TableHeader title="Date Created" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="dateCreated" className="hidden md:table-cell" />
        </tr>
      </thead>

      <tbody>
        {
          sortedEntries.map(ticket => (
            <tr key={ticket.id} className="border-t border-gray-200">
              <td className="p-2 md:p-4">{ ticket.title }</td>
              <td className="p-2 md:p-4 hidden md:table-cell">{ users.find((user) => user.id === ticket.submitterId)?.name }</td>
              <td className="p-2 md:p-4 hidden md:table-cell">{ users.find(user => user.id === ticket.developerId)?.name }</td>
              <td className="p-2 md:p-4 hidden md:table-cell">{ ticket.status }</td>
              <td className="p-2 md:p-4 hidden md:table-cell">{ ticket.priority }</td>
              <td className="p-2 md:p-4 hidden md:table-cell">{ ticket.dateCreated.toISODate() }</td>
              <td>
                <Link className="hover:underline text-purple-700" to={`/tickets/${ticket.id}`}>More Details</Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

export default TicketsTable;