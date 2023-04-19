import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { setDoc, collection, getDocs, doc, deleteDoc, getDoc, query, where, runTransaction } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { ProjectContext } from "./ProjectContext";

export enum ROLE {
  OWNER = "Owner",
  ADMIN = "Admin",
  PROJECT_MANAGER = "Project Manager",
  SUBMITTER = "Submitter",
  DEVELOPER = "Developer"
}

export type TeamMember = {
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
}

export const TeamMemberContext = createContext({} as TeamMemberContextValue);

type TeamMemberProviderProps = {
  children: ReactNode;
}

export const TeamMemberProvider = ({ children }: TeamMemberProviderProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { projects } = useContext(ProjectContext);

  const fetchProjectTeamMembers = async (projectId: string) => {
    const teamMemberSnapshot = await getDocs(collection(db, "projects", projectId, "team members"));

    return await Promise.all(teamMemberSnapshot.docs.map(async (document) => {
      const teamMemberData = await getDoc(doc(db, "users", document.id));

      if (!teamMemberData.exists()) throw new Error("Could not retrieve data for user " + document.id);

      return {
        userId: document.id,
        projectId: projectId,
        firstName: teamMemberData.exists() ? teamMemberData.data().firstName : "",
        lastName: teamMemberData.exists() ? teamMemberData.data().lastName : "",
        email: teamMemberData.exists() ? teamMemberData.data().email : "",
        fullName: teamMemberData.exists() ? teamMemberData.data().firstName + " " + teamMemberData.data().lastName : "",
        role: document.data().role,
      } as TeamMember;
    }));
  }

  const fetchTeamMembers = async () => {
    return (await Promise.all(projects.map(project => fetchProjectTeamMembers(project.id)))).flat();
  }

  const setTeamMember = async (email: string, projectId: string, role: ROLE) => {
    const userSnapshot = await getDocs(query(collection(db, "users"), where("email", "==", email)));

    if (userSnapshot.docs.length === 0 || !userSnapshot.docs[0].exists()) {
      throw new Error("No user associated with this email");
    }

    await runTransaction(db, async (transaction) => {
      transaction.set(doc(db, "projects", projectId, "team members", userSnapshot.docs[0].id), { role });

      if (!userSnapshot.docs[0].data().projects.includes(projectId)) {
        transaction.update(doc(db, "users", userSnapshot.docs[0].id), { projects: [...userSnapshot.docs[0].data().projects, projectId] });
      }
    });

    setTeamMembers(await fetchTeamMembers());
  }

  const removeTeamMember = async (teamMember: TeamMember) => {
    await runTransaction(db, async (transaction) => {
      transaction.delete(doc(db, "projects", teamMember.projectId, "team members", teamMember.userId));

      const userSnapshot = await transaction.get(doc(db, "users", teamMember.userId));

      if (!userSnapshot.exists()) throw new Error("Could not retrieve user document");

      const filteredProjects = userSnapshot.data().projects.filter((projectId: string) => projectId !== teamMember.projectId);

      transaction.update(doc(db, "users", teamMember.userId), { projects: filteredProjects });

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
    removeTeamMember
  }

  return (
    <TeamMemberContext.Provider value={value}>{ children }</TeamMemberContext.Provider>
  );
}