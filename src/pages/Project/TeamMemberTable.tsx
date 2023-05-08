import TableContainer from "../../components/TableContainer";
import TableHeader from "../../components/TableHeader";
import useTable from "../../utils/useTable";
import TableRow from "../../components/TableRow";
import TableData from "../../components/TableData";
import { ChangeEvent, useContext } from "react";
import { ROLE, TeamMemberContext } from "../../context/TeamMemberContext";
import AddTeamMemberCard from "./AddTeamMemberCard";

type TeamMemberTableProps = {
  projectId: string;
}

const TeamMemberTable = ({ projectId }: TeamMemberTableProps) => {
  const { teamMembers, removeTeamMember, hasRole } = useContext(TeamMemberContext);
  const projectTeamMembers = teamMembers.filter(teamMember => teamMember.projectId === projectId);

  const { 
    sortedEntries, 
    sortAlgorithm, 
    setSortAlgorithm,
    currentPage,
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(projectTeamMembers);

  return (
    <TableContainer title="Team Members" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo}>
      <table>
        <thead>
          <tr>
            <TableHeader title="Name" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="fullName" />
            <TableHeader title="Email" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="email" />
            <TableHeader title="Role" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="role" />
          </tr>
        </thead>

        <tbody>
          {
            sortedEntries.map(teamMember => (
              <TableRow key={teamMember.userId}>
                <TableData>{ teamMember.fullName }</TableData>
                <TableData>{ teamMember.email }</TableData>
                <TableData>{ teamMember.role }</TableData>
                <TableData>
                  {(hasRole(projectId, [ROLE.PROJECT_ADMIN, ROLE.OWNER]) && teamMember.role !== ROLE.OWNER) && 
                    <span className="text-purple-600 underline hover:cursor-pointer" onClick={() => removeTeamMember(teamMember)}>Remove</span>}
                </TableData>
              </TableRow>
            ))
          }
        </tbody>
      </table>
      <AddTeamMemberCard projectId={projectId} />
    </TableContainer>
  );
}

export default TeamMemberTable;