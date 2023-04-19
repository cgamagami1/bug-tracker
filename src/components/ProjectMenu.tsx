import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { UserContext } from "../context/UserContext";
import { Project, ProjectContext } from "../context/ProjectContext";
import Button, { BUTTON_STYLES } from "./Button";

type FormFields = {
  title: string;
  description: string;
  startDate: DateTime | null;
  endDate: DateTime | null;
}

type ProjectMenuProps = {
  editedItem?: Project;
}

const ProjectMenu = ({ editedItem }: ProjectMenuProps) => {
  const [formFields, setFormFields] = useState<FormFields>({ 
    title: editedItem?.title ?? "", 
    description: editedItem?.description ?? "", 
    startDate: editedItem?.startDate ?? null, 
    endDate: editedItem?.endDate ?? null
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { addProject, updateProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  if (!user) return <></>;

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const projectData = {
      title: formFields.title,
      description: formFields.description,
      startDate: formFields.startDate,
      endDate: formFields.endDate
    }

    if (editedItem) {
      await updateProject(editedItem.id, projectData);
      navigate(`/projects/${editedItem.id}`);
    }
    else {
      await addProject(projectData, user.uid);
      navigate("/projects");
    }

    setIsLoading(false);
  }
  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormFields({ ...formFields, [e.target.id]: e.target.value });
  const handleOnDateChange = (e: ChangeEvent<HTMLInputElement>) => setFormFields({ ...formFields, [e.target.id]: DateTime.fromISO(e.target.value)});

  return (
    <div className="bg-white rounded-md px-6 py-2 text-sm">
      <h3 className="text-lg p-2">{ editedItem ? "Edit" : "Add" } Project</h3>
      <div className="text-left border-t border-gray-400 w-full">
        <form className="flex flex-col gap-4 px-2 py-4" onSubmit={handleOnSubmit}>
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="title">Title</label>
            <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="title" onChange={handleOnChange} value={formFields.title} required />
          </div>
          
          <div className="flex flex-col col-span-2">
            <label className="font-bold" htmlFor="description">Description</label>
            <textarea className="focus:outline-none border rounded-md resize-none p-2" id="description" rows={5} onChange={handleOnChange} value={formFields.description}></textarea>
          </div>

          <div className="flex flex-col">
            <label className="font-bold" htmlFor="startDate">Start Date</label>
            <input className="focus:outline-none border rounded-md h-9 w-40 px-2" id="startDate" type="date" onChange={handleOnDateChange} value={formFields.startDate?.toISODate() ?? ""} />
          </div>
          
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="endDate">End Date</label>
            <input className="focus:outline-none border rounded-md h-9 w-40 px-2" id="endDate" type="date" onChange={handleOnDateChange} value={formFields.endDate?.toISODate() ?? ""} />
          </div>

          <div className="flex gap-4">
            <Button title="Save" type="submit" isLoading={isLoading} />

            <Link to={editedItem ? ".." : "/projects"} relative="path">
              <Button title="Cancel" style={BUTTON_STYLES.GRAY} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectMenu;