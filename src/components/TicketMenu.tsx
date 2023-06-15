import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Ticket, PRIORITY, TicketContext } from "../context/TicketContext";
import Button, { BUTTON_STYLES } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { ProjectContext, fetchTeamMembers } from "../context/ProjectContext";
import { UserContext } from "../context/UserContext";
import { TeamMember, ROLE } from "../context/ProjectContext";
import { useErrorBoundary } from "react-error-boundary";
import { FirebaseError } from "firebase/app";

type FormFields = {
  title: string;
  developerId: string;
  priority: PRIORITY;
  projectId: string;
  description: string;
}

type TicketMenuProps = {
  editedItem?: Ticket;
}

const TicketMenu = ({ editedItem }: TicketMenuProps) => {
  const { user } = useContext(UserContext);
  const { projects, hasRole } = useContext(ProjectContext);
  const [developers, setDevelopers] = useState<TeamMember[]>([]);
  const { addTicket, updateTicket, deleteTicket } = useContext(TicketContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const submitterProjects = projects.filter(project => hasRole(project.id, [ROLE.SUBMITTER, ROLE.PROJECT_ADMIN, ROLE.OWNER]));
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  
  const [formFields, setFormFields] = useState<FormFields>({
    title: editedItem?.title ?? "",
    developerId: editedItem?.developerId ?? "",
    priority: editedItem?.priority ?? PRIORITY.LOW,
    projectId: editedItem?.projectId ?? submitterProjects[0]?.id,
    description: editedItem?.description ?? ""
  });

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) throw new Error("No user authenticated");

    if (!formFields.title || !formFields.developerId || !formFields.priority || !formFields.projectId) {
      setErrorMessage("One or more required fields missing");
    }
    else {
      try {
        if (!editedItem) {
          await addTicket({
            ...formFields,
            submitterId: user.uid
          });

          navigate("/tickets");
        }
        else {
          await updateTicket(editedItem.id, {
            ...formFields,
            submitterId: editedItem.submitterId
          });

          navigate(`/tickets/${editedItem.id}`);
        }
      }
      catch (error) {
        if (error instanceof Error) setErrorMessage("An error has occured: " + error.message);
        if ((error as FirebaseError).code === "permission-denied") showBoundary(error);
      }
    }

    setIsLoading(false);
  }

  const handleOnDelete = async () => {
    if (!editedItem) return;

    await deleteTicket(editedItem);

    navigate(`/tickets`)
  }

  useEffect(() => {
    const fetchDevelopers = async () => {
      const newDevelopers = await fetchTeamMembers(["projectId", "==", formFields.projectId], ["role", "==", ROLE.DEVELOPER]);
      setDevelopers(newDevelopers);
      setFormFields({ ...formFields, developerId: newDevelopers[0]?.userId ?? "" });
    }

    fetchDevelopers();
  }, [formFields.projectId]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormFields({ ...formFields, [e.target.id]: e.target.value });
  const handleOnProjectChange = (e: ChangeEvent<HTMLSelectElement>) => setFormFields({ ...formFields, projectId: e.target.value, developerId: developers[0]?.userId ?? "" });

  return (
    <div className="bg-white rounded-md px-6 py-2 text-sm">
      <h3 className="text-lg p-2">{ editedItem ? "Edit" : "Add"} Ticket</h3>
      <div className="text-left border-t border-gray-400 w-full">
        <form className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 px-2 py-4" onSubmit={handleOnSubmit}>
          <div className="flex flex-col col-span-2 gap-1">
            <label className="font-bold" htmlFor="title">Title</label>

             <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="title" value={formFields.title} onChange={handleOnChange} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="developerId">Developer</label>

             <select className="focus:outline-none border rounded-md h-9 px-2" id="developerId" value={formFields.developerId} onChange={handleOnChange}>
              { developers.map(developer => (
                <option key={developer.userId} value={developer.userId}>{ developer.fullName }</option>
              )) }
            </select>
          </div>

           <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="priority">Priority</label>

             <select className="focus:outline-none border rounded-md h-9 px-2" id="priority" value={formFields.priority} onChange={handleOnChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

           <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="projectId">Project</label>

             <select className="focus:outline-none border rounded-md h-9 px-2" id="projectId" value={formFields.projectId} onChange={handleOnProjectChange}>
              { submitterProjects.map(project => (
                <option key={project.id} value={project.id}>{ project.title }</option>
              )) }
            </select>
          </div>

           <div className="flex flex-col col-span-2 gap-1">
            <label className="font-bold" htmlFor="description">Description</label>

             <textarea className="focus:outline-none border rounded-md resize-none p-2" id="description" rows={5} value={formFields.description} onChange={handleOnChange}></textarea>
          </div>

           <div className="flex gap-4">
            <Button title="Save" type="submit" isLoading={isLoading} />

            <Link to={editedItem ? ".." : "/tickets"} relative="path">
              <Button title="Cancel" style={BUTTON_STYLES.GRAY} />
            </Link>
          </div>

          <div className="ml-auto">
            {editedItem && <Button title="Delete Ticket" style={BUTTON_STYLES.RED} handleOnClick={handleOnDelete} />}
          </div>

         </form>
          <p className="m-2 text-red-600">{ errorMessage }</p>
      </div>
    </div>
  );
}

export default TicketMenu;