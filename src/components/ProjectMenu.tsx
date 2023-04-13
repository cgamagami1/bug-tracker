import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { collection, addDoc, Timestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { UserContext } from "../context/UserContext";
import { Project } from "../context/ProjectContext";

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

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const projectData = {
      title: formFields.title,
      description: formFields.description,
      startDate: formFields.startDate && Timestamp.fromDate(formFields.startDate.toJSDate()),
      endDate: formFields.endDate && Timestamp.fromDate(formFields.endDate.toJSDate())
    }

    if (editedItem) {
      await updateDoc(doc(db, "projects", editedItem.id), projectData);

      navigate("..");
    }
    else {
      await addDoc(collection(db, "projects"), {
        ...projectData,
        ownerId: user?.uid,
      });
  
      navigate("/projects");
    }
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
            <input className="focus:outline-none border rounded-md h-9 w-40 px-2" id="endDate" type="date" onChange={handleOnDateChange} value={formFields.startDate?.toISODate() ?? ""} />
          </div>

          <div className="flex gap-4">
            <input className="bg-purple-500 text-white p-2 select-none rounded-md hover:cursor-pointer hover:bg-purple-600 w-40" type="submit" value="Save" />
            <Link to={editedItem ? ".." : "/projects"} relative="path" className="bg-gray-200 p-2 select-none rounded-md hover:cursor-pointer hover:bg-gray-300 w-40 text-center">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectMenu;