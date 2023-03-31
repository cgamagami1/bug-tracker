import { SetStateAction } from "react";
import Table from "../../components/Table";
import TableHeader from "../../components/TableHeader";
import useTable, { ShownEntries } from "../../utils/useTable";

export enum ROLE {
  ADMIN = "Admin",
  PROJECT_MANAGER = "Project Manager",
  SUBMITTER = "Submitter",
  DEVELOPER = "Developer"
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: ROLE;
}

const UsersTable = () => {
  const users = [
    {
      id: 0,
      name: "john",
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
      name: "john",
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

  const { sortedEntries, sortAlgorithm, setSortAlgorithm, shownEntries, setShownEntries } = useTable(users);

  return (
    <Table title="Users" shownEntries={shownEntries} setShownEntries={setShownEntries} totalEntries={users.length}>
      <thead>
        <tr>
          <TableHeader title="Name" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="name" />
          <TableHeader title="Email" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="email" />
          <TableHeader title="Role" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="role" />
        </tr>
      </thead>

      <tbody>
        {
          sortedEntries.map(user => (
            <tr key={user.id} className="border-t border-gray-200">
              <td className="p-2 md:p-4">{ user.name }</td>
              <td className="p-2 md:p-4">{ user.email }</td>
              <td className="p-2 md:p-4">{ user.role }</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

export default UsersTable;