import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Ticket, PRIORITY, STATUS } from "../context/TicketContext";
import Button, { BUTTON_STYLES } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
import { TeamMember, TeamMemberContext } from "../context/TeamMemberContext";
import { ROLE } from "../context/TeamMemberContext";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { UserContext } from "../context/UserContext";

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

const getDevelopers = (teamMembers: TeamMember[], projectId: string) => {
  return teamMembers.filter(teamMember => teamMember.projectId === projectId && teamMember.role === ROLE.DEVELOPER);
}

const TicketMenu = ({ editedItem }: TicketMenuProps) => {
  const { user } = useContext(UserContext);
  const { projects } = useContext(ProjectContext);
  const { teamMembers } = useContext(TeamMemberContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const developers = getDevelopers(teamMembers, projects[0]?.id);
  const navigate = useNavigate();
  
  const [formFields, setFormFields] = useState<FormFields>({
    title: editedItem?.title ?? "",
    developerId: editedItem?.developerId ?? developers[0]?.userId ?? "",
    type: editedItem?.type ?? "Bug",
    priority: editedItem?.priority ?? PRIORITY.LOW,
    projectId: editedItem?.projectId ?? projects[0].id,
    description: editedItem?.description ?? ""
  });

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.title || !formFields.developerId || !formFields.type || !formFields.priority || !formFields.projectId) {
      setErrorMessage("One or more required fields missing");
    }
    else {
      const ticketData = {
        title: formFields.title,
        description: formFields.description,
        developerId: formFields.developerId,
        submitterId: user?.uid,
        projectId: formFields.projectId,
        priority: formFields.priority,
        type: formFields.type
      }

      try {
        if (!editedItem) {
          await addDoc(collection(db, "tickets"), {
            ...ticketData,
            status: STATUS.OPEN,
            dateCreated: serverTimestamp()
          });
        }
        else {
          await updateDoc(doc(db, "tickets", editedItem.id), ticketData);
        }

        navigate("/tickets");
      }
      catch (error) {
        if (error instanceof Error) setErrorMessage("An error has occured: " + error.message);
      }
    }

    setIsLoading(false);
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormFields({ ...formFields, [e.target.id]: e.target.value });
  const handleOnProjectChange = (e: ChangeEvent<HTMLSelectElement>) => setFormFields({ 
    ...formFields, 
    projectId: e.target.value, 
    developerId: getDevelopers(teamMembers, e.target.value)[0]?.userId ?? ""
  });

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
            <label className="font-bold" htmlFor="type">Type</label>

             <select className="focus:outline-none border rounded-md h-9 px-2" id="type" value={formFields.type} onChange={handleOnChange}>
              <option value="Bug">Bug</option>
              <option value="UI">UI</option>
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
              { projects.map(project => (
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

         </form>
          <p className="m-2 text-red-600">{ errorMessage }</p>
      </div>
    </div>
  );
}

export default TicketMenu;