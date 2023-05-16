import { ChangeEvent, useContext, useState } from "react";
import Button from "../../components/Button";
import { ProjectContext, ROLE } from "../../context/ProjectContext";
import { getDocs, query, collection, where, setDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import { UserContext } from "../../context/UserContext";

type FormFields = {
  email: string;
  role: ROLE;
}

type AddTeamMemberCardProps = {
  projectId: string;
}

const AddTeamMemberCard = ({ projectId }: AddTeamMemberCardProps) => {
  const [formFields, setFormFields] = useState<FormFields>({ email: "", role: ROLE.DEVELOPER });
  const [statusMessage, setStatusMessage] = useState("");
  const { user } = useContext(UserContext);
  const { hasRole } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);

  const addInvitation = async (email: string, projectId: string, role: ROLE) => {
    const userReponse = await getDocs(query(collection(db, "users"), where("email", "==", email)));
    const userDoc = userReponse.docs[0];

    if (!userDoc.exists()) throw new Error("User does not exist");
    if (userDoc.id === user?.uid) throw new Error("You are already added to this project");

    setDoc(doc(db, "invitations", userDoc.id + projectId), { userId: userDoc.id, projectId, role });
  }

  const handleOnAddTeamMember = async () => {
    setIsLoading(true);

    try {
      await addInvitation(formFields.email, projectId, formFields.role);

      setStatusMessage("User has been sent an invitation")
    }
    catch (error) {
      if (error instanceof Error) {
        setStatusMessage(error.message);
      }
      else {
        setStatusMessage("Error adding user to the project");
      }
    }

    setFormFields({ email: "", role: ROLE.DEVELOPER });
    setIsLoading(false);
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormFields({ ...formFields, [e.target.id]: e.target.value }); 

  return (
    <>
      <div className="p-2 flex justify-between gap-6 border-t border-gray-200">
        <Button title="Add New Member" handleOnClick={handleOnAddTeamMember} isLoading={isLoading} />
        <input type="text" className="focus:outline-none border rounded-md h-9 px-2 flex-grow" placeholder="Team Member Email" id="email" value={formFields.email} onChange={handleOnChange}/>
        <select className="focus:outline-none border rounded-md h-9 px-2" id="role" value={formFields.role} onChange={handleOnChange}>
          <option value={ROLE.DEVELOPER}>Developer</option>
          <option value={ROLE.SUBMITTER}>Submitter</option>
          <option value={ROLE.PROJECT_ADMIN}>Project Admin</option>
          {hasRole(projectId, ROLE.OWNER) && <option value={ROLE.OWNER}>Owner</option>}
        </select>
      </div>
      {statusMessage !== "" && <p className="px-2 pb-2">{ statusMessage }</p>}
    </>
  );
}

export default AddTeamMemberCard;