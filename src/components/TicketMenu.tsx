import { FormEvent, useContext, useState } from "react";
import { Ticket, PRIORITY } from "../context/TicketContext";
import Button, { BUTTON_STYLES } from "./Button";
import { Link } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";

type FormFields = {
  title: string;
  developerId: string;
  type: "Bug" | 'UI';
  priority: PRIORITY;
  projectId: string;
  description: string;
}

type TicketMenuProps = {
  editedItem?: Ticket;
}

const TicketMenu = ({ editedItem }: TicketMenuProps) => {
  const { projects } = useContext(ProjectContext);

  const [formFields, setFormFields] = useState<FormFields>({
    title: editedItem?.title ?? "",
    developerId: editedItem?.developerId ?? "",
    type: editedItem?.type ?? "Bug",
    priority: editedItem?.priority ?? PRIORITY.LOW,
    projectId: editedItem?.projectId ?? projects[0].id,
    description: editedItem?.description ?? ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setIsLoading(false);
  }

  return (
    <div className="bg-white rounded-md px-6 py-2 text-sm">
        <h3 className="text-lg p-2">{ editedItem ? "Edit" : "Add"} Ticket</h3>
        <div className="text-left border-t border-gray-400 w-full">
          <form className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 px-2 py-4" onSubmit={handleOnSubmit}>
            <div className="flex flex-col col-span-2 gap-1">
              <label className="font-bold" htmlFor="title">Title</label>
              <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="title" required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="developer">Developer</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                <option value="John">John</option>
                <option value="John2">John2</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="description">Type</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                <option value="Bug">Bug</option>
                <option value="UI">UI</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="description">Priority</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="description">Project</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                { projects.map(project => (
                  <option key={project.id} value={project.id}>{ project.title }</option>
                )) }
              </select>
            </div>

            <div className="flex flex-col col-span-2 gap-1">
              <label className="font-bold" htmlFor="description">Description</label>
              <textarea className="focus:outline-none border rounded-md resize-none p-2" id="description" rows={5}></textarea>
            </div>

            <div className="flex gap-4">
              <Button title="Save" type="submit" isLoading={isLoading} />

              <Link to={editedItem ? ".." : "/tickets"} relative="path">
                <Button title="Cancel" style={BUTTON_STYLES.GRAY} />
              </Link>
            </div>
          </form>
        </div>
      </div>
  );
}

export default TicketMenu;