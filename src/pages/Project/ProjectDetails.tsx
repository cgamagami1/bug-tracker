import { Project } from "../MyProjects/ProjectsTable";
import ProjectDetailsItem from "./ProjectDetailsItem";

type ProjectDetailsProps = {
  projectName: string;
}

const ProjectDetails = ({ projectName }: ProjectDetailsProps) => {
  return (
    <div className="bg-white rounded-md px-6 py-2 flex-grow text-sm self-stretch">
      <h3 className="text-xl p-2">{ projectName } Details</h3>

      <div className="text-left border-t border-gray-400 w-full grid grid-cols-2">
        <ProjectDetailsItem name="Property" value="Value" />
        <ProjectDetailsItem name="Property" value="Value" />
        <ProjectDetailsItem name="Property" value="Value" />
        <ProjectDetailsItem name="Property" value="Value" />
        <ProjectDetailsItem name="Property" value="Value" />
        <ProjectDetailsItem name="Property" value="Value" />
        <ProjectDetailsItem name="Property" value="Value" />
        <ProjectDetailsItem name="Property" value="Value" />
      </div>
    </div>
  );
}

export default ProjectDetails;