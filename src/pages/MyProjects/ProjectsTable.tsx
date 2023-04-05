import { Link } from "react-router-dom";
import TableContainer from "../../components/TableContainer";
import TableHeader from "../../components/TableHeader";
import useTable from "../../utils/useTable";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";

export type Project = {
  id: number;
  name: string;
  description: string;
}

const ProjectsTable = () => {
  const projects = [
      {
        id: 0,
        name: "My proj",
        description: "description"
      },
      {
        id: 1,
        name: "My aproj",
        description: "ddescription"
      },
      {
        id: 2,
        name: "My bproj",
        description: "edescription"
      },
      {
        id: 3,
        name: "My proj",
        description: "bdescription"
      },
      {
        id: 4,
        name: "My dproj",
        description: "description"
      },
      {
        id: 5,
        name: "My cproj",
        description: "description"
      },
      {
        id: 6,
        name: "My proj",
        description: "adescription"
      },
      {
        id: 7,
        name: "My proj",
        description: "description"
      },
      {
        id: 8,
        name: "My aproj",
        description: "ddescription"
      },
      {
        id: 9,
        name: "My bproj",
        description: "edescription"
      },
      {
        id: 10,
        name: "My proj",
        description: "bdescription"
      },
      {
        id: 11,
        name: "My dproj",
        description: "description"
      },
      {
        id: 12,
        name: "My cproj",
        description: "description"
      },
      {
        id: 13,
        name: "My proj",
        description: "adescription"
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
  } = useTable(projects);

  return (
    <TableContainer title="Projects" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo}>
      <table>
        <thead>
          <tr>
            <TableHeader title="Name" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="name" /> 
            <TableHeader title="Description" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute="description" />
          </tr>
        </thead>

        <tbody>
          {
            sortedEntries.map(project => (
              <TableRow key={project.id}>
                <TableData>{ project.name }</TableData>
                <TableData>{ project.description }</TableData>
                <TableData>
                  <Link className="hover:underline text-purple-700" to={`/projects/${project.name.toLowerCase()}`}>Details</Link>
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