import TableContainer from "../../components/TableContainer";
import TableHeader from "../../components/TableHeader";
import useTable from "../../utils/useTable";
import TableRow from "../../components/TableRow";
import TableData from "../../components/TableData";

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
      name: "john1",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 1,
      name: "john2",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 2,
      name: "john3",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 3,
      name: "john4",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 4,
      name: "john5",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 5,
      name: "john6",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 6,
      name: "john7",
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
  } = useTable(users);

  return (
    <TableContainer title="Users" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo}>
      <table>
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
              <TableRow key={user.id}>
                <TableData>{ user.name }</TableData>
                <TableData>{ user.email }</TableData>
                <TableData>{ user.role }</TableData>
              </TableRow>
            ))
          }
        </tbody>
      </table>
    </TableContainer>
  );
}

export default UsersTable;