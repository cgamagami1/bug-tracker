import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { setDoc, collection, getDocs, doc, getDoc, query, where, runTransaction } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { ProjectContext } from "./ProjectContext";
import { UserContext } from "./UserContext";

export enum ROLE {
  OWNER = "Owner",
  PROJECT_ADMIN = "Project Admin",
  SUBMITTER = "Submitter",
  DEVELOPER = "Developer"
}

export type TeamMember = {
  id: string;
  userId: string;
  projectId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: ROLE;
}

type TeamMemberContextValue = {
  teamMembers: TeamMember[];
  setTeamMember: (teamMemberEmail: string, projectId: string, role: ROLE) => Promise<void>;
  removeTeamMember: (teamMember: TeamMember) => Promise<void>;
  hasRole: (projectId: string, role: ROLE | ROLE[]) => boolean;
  getTeamMemberName: (teamMemberId: string) => string;
}

export const TeamMemberContext = createContext({} as TeamMemberContextValue);

type TeamMemberProviderProps = {
  children: ReactNode;
}

export const TeamMemberProvider = ({ children }: TeamMemberProviderProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { user } = useContext(UserContext);
  const { projects } = useContext(ProjectContext);

  const hasRole = (projectId: string, role: ROLE | ROLE[]) => {
    if (!user) return false;

    const userTeamMember = teamMembers.find(teamMember => teamMember.userId === user.uid && teamMember.projectId === projectId);

    if (!userTeamMember) return false;

    if (role instanceof Array) {
      for (const r of role) {
        if (r === userTeamMember.role) return true;
      }
      
      return false;
    }
    else {
      return userTeamMember.role === role;
    }
  }

  const getTeamMemberName = (teamMemberId: string) => teamMembers.find(teamMember => teamMember.userId === teamMemberId)?.fullName ?? "Removed Team Member";

  const fetchTeamMembers = async () => {
    const teamMemberSnapshots = await Promise.all(projects.map(project => getDocs(query(collection(db, "teamMembers"), where("projectId", "==", project.id)))));

    return (await Promise.all(teamMemberSnapshots.map(async (snapshot) => {

      return await Promise.all(snapshot.docs.map(async (teamMemberDocument) => {
        const userData = await getDoc(doc(db, "users", teamMemberDocument.data().userId));

        if (!userData.exists()) throw new Error("Could not retrieve data for user " + teamMemberDocument.data().userId);

        return {
          id: teamMemberDocument.id,
          userId: teamMemberDocument.data().userId,
          projectId: teamMemberDocument.data().projectId,
          firstName: userData.exists() ? userData.data().firstName : "",
          lastName: userData.exists() ? userData.data().lastName : "",
          email: userData.exists() ? userData.data().email : "",
          fullName: userData.exists() ? userData.data().firstName + " " + userData.data().lastName : "",
          role: teamMemberDocument.data().role,
        } as TeamMember;
      }));
    }))).flat();
  }

  const setTeamMember = async (email: string, projectId: string, role: ROLE) => {
    const userSnapshot = await getDocs(query(collection(db, "users"), where("email", "==", email)));

    if (userSnapshot.docs.length === 0 || !userSnapshot.docs[0].exists()) {
      throw new Error("No user associated with this email");
    }

    await setDoc(doc(db, "teamMembers", userSnapshot.docs[0].id + projectId), {
      projectId: projectId,
      role: role,
      userId: userSnapshot.docs[0].id
    });

    setTeamMembers(await fetchTeamMembers());
  }

  const removeTeamMember = async (teamMember: TeamMember) => {
    const developerTicketSnapshot = await getDocs(query(collection(db, "tickets"), where("developerId", "==", teamMember.userId)));
    const submitterTicketSnapshot = await getDocs(query(collection(db, "tickets"), where("submitterId", "==", teamMember.userId)));

    await runTransaction(db, async (transaction) => {
      transaction.delete(doc(db, "teamMembers", teamMember.id));

      for (const ticketDoc of developerTicketSnapshot.docs) {
        transaction.update(ticketDoc.ref, { developerId: null });
      }

      for (const ticketDoc of submitterTicketSnapshot.docs) {
        transaction.update(ticketDoc.ref, { submitterId: null });
      }
    });

    setTeamMembers(await fetchTeamMembers());
  }

  useEffect(() => {
    const getTeamMembers = async () => {
      setTeamMembers(await fetchTeamMembers());
    }

    getTeamMembers();
  }, [projects]);
  
  const value = {
    teamMembers,
    setTeamMember,
    removeTeamMember,
    hasRole,
    getTeamMemberName
  }

  return (
    <TeamMemberContext.Provider value={value}>{ children }</TeamMemberContext.Provider>
  );
}