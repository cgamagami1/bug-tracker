import { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import TableHeader from "../../components/TableHeader";

export type Project = {
  id: number;
  name: string;
  description: string;
}

const sortByName = (a: Project, b: Project) => a.name.localeCompare(b.name); 
const sortByNameReversed = (a: Project, b: Project) => b.name.localeCompare(a.name);
const sortByDescription = (a: Project, b: Project) => a.description.localeCompare(b.description); 
const sortByDescriptionReversed = (a: Project, b: Project) => b.description.localeCompare(a.description);

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
      {
        id: 14,
        name: "proj",
        description: "description"
      },
      {
        id: 15,
        name: "aproj",
        description: "ddescription"
      },
      {
        id: 16,
        name: "bproj",
        description: "edescription"
      },
      {
        id: 17,
        name: "proj",
        description: "bdescription"
      },
      {
        id: 18,
        name: "dproj",
        description: "description"
      },
      {
        id: 19,
        name: "cproj",
        description: "description"
      },
      {
        id: 20,
        name: "proj",
        description: "adescription"
      },
      {
        id: 21,
        name: "proj",
        description: "description"
      },
      {
        id: 22,
        name: "aproj",
        description: "ddescription"
      },
      {
        id: 23,
        name: "bproj",
        description: "edescription"
      },
      {
        id: 24,
        name: "proj",
        description: "bdescription"
      },
      {
        id: 25,
        name: "dproj",
        description: "description"
      },
      {
        id: 26,
        name: "cproj",
        description: "description"
      },
      {
        id: 27,
        name: "proj",
        description: "adescription"
      },
  ]
  const [sortingAlgorithm, setSortingAlgorithm] = useState(() => (a: Project, b: Project) => 0);
  const [shownEntries, setShownEntries] = useState({ firstShownEntry: 0, lastShownEntry: Math.min(4 , projects.length - 1) });

  projects.sort(sortingAlgorithm);

  return (
    <Table title="Projects" shownEntries={shownEntries} setShownEntries={setShownEntries} totalEntries={projects.length}> 
      <thead>
        <tr>
          <TableHeader title="Name" className="max-w-64" 
            sortingAlgorithm={sortingAlgorithm} 
            setSortingAlgorithm={setSortingAlgorithm} 
            headerSortingAlgorithm={sortByName} 
            headerReverseSortingAlgorithm={sortByNameReversed} />
          <TableHeader title="Description" className="hidden md:table-cell"
            sortingAlgorithm={sortingAlgorithm}
            setSortingAlgorithm={setSortingAlgorithm}
            headerSortingAlgorithm={sortByDescription}
            headerReverseSortingAlgorithm={sortByDescriptionReversed} />
        </tr>
      </thead>

      <tbody>
        {
          projects.map((project, i) => (
            (i >= shownEntries.firstShownEntry && i <= shownEntries.lastShownEntry) && 
            <tr key={project.id} className="border-t border-gray-200">
              <td className="p-4">{ project.name }</td>
              <td className="p-4 hidden md:table-cell">{ project.description }</td>
              <td className="p-4 text-purple-700 w-20">
                <Link to={`/projects/${project.name.toLowerCase()}`}>Details</Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

export default ProjectsTable;