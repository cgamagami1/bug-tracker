import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ProjectContext, ROLE } from "../context/ProjectContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { PRIORITY, TicketContext } from "../context/TicketContext";

const SignInAsGuest = () => {
  const navigate = useNavigate();
  const { createAnonymousUser } = useContext(UserContext);
  const { addProject, addTeamMember } = useContext(ProjectContext);
  const { addTicket, updateTicket } = useContext(TicketContext);

  const handleOnSignInAsGuest = async () => {
    await signOut(auth);
    const user = await createAnonymousUser({ email: "", firstName: "Guest", lastName: "User" });

    const project1 = await addProject({ title: "Desktop App", description: "", startDate: null, endDate: null }, user.uid);
    await addTeamMember("8MqNn59YmfgoQToSqlHQFecoGzp2", project1.id, ROLE.PROJECT_ADMIN);
    await addTeamMember("tz0bNbzC3ITvwwZ5pXxTioVqBgu2", project1.id, ROLE.SUBMITTER);
    await addTeamMember("U5oAmh01o0hKl191oSd7LVFwZVM2", project1.id, ROLE.DEVELOPER);
    const project2 = await addProject({ title: "Mobile App", description: "", startDate: null, endDate: null }, user.uid);
    await addTeamMember("8MqNn59YmfgoQToSqlHQFecoGzp2", project2.id, ROLE.PROJECT_ADMIN);
    await addTeamMember("tz0bNbzC3ITvwwZ5pXxTioVqBgu2", project2.id, ROLE.SUBMITTER);
    await addTeamMember("U5oAmh01o0hKl191oSd7LVFwZVM2", project2.id, ROLE.DEVELOPER);

    const tickets = [{
      title: "Title",
      description: "Description",
      submitterId: user.uid,
      developerId: "U5oAmh01o0hKl191oSd7LVFwZVM2",
      projectId: project1.id,
      priority: PRIORITY.LOW
    },
    {
      title: "Title",
      description: "Description",
      submitterId: user.uid,
      developerId: "U5oAmh01o0hKl191oSd7LVFwZVM2",
      projectId: project1.id,
      priority: PRIORITY.MEDIUM
    },
    {
      title: "Title",
      description: "Description",
      submitterId: user.uid,
      developerId: "U5oAmh01o0hKl191oSd7LVFwZVM2",
      projectId: project2.id,
      priority: PRIORITY.LOW
    },
    {
      title: "Title",
      description: "Description",
      submitterId: user.uid,
      developerId: "U5oAmh01o0hKl191oSd7LVFwZVM2",
      projectId: project2.id,
      priority: PRIORITY.HIGH
    },]

    for (const ticket of tickets) {
      await addTicket(ticket);
    }

    navigate("/");
    location.reload();
  }
  return (
    <p className="text-center"><span className="text-purple-600 hover:underline hover:cursor-pointer" onClick={handleOnSignInAsGuest}>Sign In As Guest</span></p>
  );
}

export default SignInAsGuest;