import { Link } from "react-router-dom";
import TableContainer from "../../components/TableContainer";
import TableHeader from "../../components/TableHeader";
import useTable from "../../utils/useTable";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const ProjectsTable = () => {
  const { projects } = useContext(ProjectContext);

  const { 
    sortedEntries, 
    sortAlgorithm, 
    setSortAlgorithm,
    currentPage,
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(projects);

  return (
    <TableContainer title="Projects" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo}>
      <table>
        <thead>
          <tr>
            <TableHeader title="Title" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="title" /> 
            <TableHeader title="Description" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="description" />
          </tr>
        </thead>

        <tbody>
          {
            sortedEntries.map(project => (
              <TableRow key={project.id}>
                <TableData>{ project.title }</TableData>
                <TableData>{ project.description }</TableData>
                <TableData>
                  <Link className="hover:underline text-purple-700" to={`/projects/${project.id}`}>Details</Link>
                </TableData>
              </TableRow>
            ))
          }
        </tbody>
      </table>
    </TableContainer>
  );
}

export default ProjectsTable;