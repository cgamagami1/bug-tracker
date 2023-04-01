import { Link } from "react-router-dom";
import Table from "../../components/Table";
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
        name: "proj",
        description: "description"
      },
      {
        id: 1,
        name: "aproj",
        description: "ddescription"
      },
      {
        id: 2,
        name: "bproj",
        description: "edescription"
      },
      {
        id: 3,
        name: "proj",
        description: "bdescription"
      },
      {
        id: 4,
        name: "dproj",
        description: "description"
      },
      {
        id: 5,
        name: "cproj",
        description: "description"
      },
      {
        id: 6,
        name: "proj",
        description: "adescription"
      },
      {
        id: 7,
        name: "proj",
        description: "description"
      },
      {
        id: 8,
        name: "aproj",
        description: "ddescription"
      },
      {
        id: 9,
        name: "bproj",
        description: "edescription"
      },
      {
        id: 10,
        name: "proj",
        description: "bdescription"
      },
      {
        id: 11,
        name: "dproj",
        description: "description"
      },
      {
        id: 12,
        name: "cproj",
        description: "description"
      },
      {
        id: 13,
        name: "proj",
        description: "adescription"
      },
  ]

  const { 
    sortedEntries, 
    sortAlgorithm, 
    setSortAlgorithm,
    showingEntriesText, 
    currentPage,
    pageButtons,
    handleOnNewPage
  } = useTable(projects);

  return (
    <Table title="Projects" showingEntriesText={showingEntriesText} currentPage={currentPage} pageButtons={pageButtons} handleOnNewPage={handleOnNewPage}> 
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
    </Table>
  );
}

export default ProjectsTable;