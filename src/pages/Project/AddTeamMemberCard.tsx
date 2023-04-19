import { ChangeEvent, useContext, useState } from "react";
import Button from "../../components/Button";
import { ROLE, TeamMemberContext } from "../../context/TeamMemberContext";

type FormFields = {
  email: string;
  role: ROLE;
}

type AddTeamMemberCardProps = {
  projectId: string;
}

const AddTeamMemberCard = ({ projectId }: AddTeamMemberCardProps) => {
  const [formFields, setFormFields] = useState<FormFields>({
    email: "",
    role: ROLE.DEVELOPER
  });
  const { setTeamMember } = useContext(TeamMemberContext);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnAddTeamMember = async () => {
    setIsLoading(true);

    try {
      await setTeamMember(formFields.email, projectId, formFields.role);

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
          <option value={ROLE.PROJECT_MANAGER}>Project Manager</option>
          <option value={ROLE.ADMIN}>Admin</option>
        </select>
      </div>
      {statusMessage !== "" && <p className="px-2 pb-2">{ statusMessage }</p>}
    </>
  );
}

export default AddTeamMemberCard;