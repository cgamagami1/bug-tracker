import TableContainer from "../../components/TableContainer";
import TableHeader from "../../components/TableHeader";
import useTable from "../../utils/useTable";
import TableRow from "../../components/TableRow";
import TableData from "../../components/TableData";
import { useContext } from "react";
import { OrganizationContext } from "../../context/OrganizationContext";

const UsersTable = () => {
  const { users } = useContext(OrganizationContext);

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