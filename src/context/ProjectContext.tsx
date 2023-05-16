import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { where, query, getDocs, collection, getDoc, updateDoc, doc, runTransaction, setDoc, QuerySnapshot, DocumentData, and, WhereFilterOp } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { UserContext } from "./UserContext";
import { dateTimeToTimestamp, timestampToDateTime } from "../utils/date-conversion";

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

export type Invitation = {
  id: string;
  userId: string;
  projectId: string;
  projectName: string;
  role: ROLE;
}

type ProjectData = {
  title: string;
  description: string;
  startDate: DateTime | null;
  endDate: DateTime | null;
}

export type Project = { id: string; } & ProjectData;

type ProjectContextValue = {
  projects: Project[];
  addProject: (projectData: ProjectData, ownerId: string) => Promise<void>;
  updateProject: (projectId: string, projectData: ProjectData) => Promise<void>;
  deleteProject: (project: Project) => Promise<void>;
  addTeamMember: (userId: string, projectId: string, role: ROLE) => void;
  removeTeamMember: (teamMember: TeamMember) => void;
  hasRole: (projectId: string, role: ROLE | ROLE[]) => boolean;
}

export const ProjectContext = createContext({} as ProjectContextValue);

type ProjectProviderProps = {
  children: ReactNode;
}

export const fetchTeamMembers = async (...constraints: [field: string, operation: WhereFilterOp, value: string | ROLE][]) => {

  const teamMemberSnapshot = await getDocs(query(collection(db, "teamMembers"), and(...constraints.map(constraint => where(constraint[0], constraint[1], constraint[2])))));

  return await responseToTeamMembers(teamMemberSnapshot);
}

export const responseToTeamMembers = async (snapshot: QuerySnapshot<DocumentData>) => {
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
}

export const getTeamMemberName = async (teamMemberId: string) => {
  const teamMemberDoc = await getDoc(doc(db, "users", teamMemberId));

  if (!teamMemberDoc.exists()) return "Removed Team Member";

  return teamMemberDoc.data().firstName + " " + teamMemberDoc.data().lastName;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userRoles, setUserRoles] = useState<TeamMember[]>([]);
  const { user } = useContext(UserContext);

  const hasRole = (projectId: string, role: ROLE | ROLE[]) => {
    if (!user) return false;

    const userTeamMember = userRoles.find(teamMember => teamMember.projectId === projectId);

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
  
  const fetchProjects = async () => {
    if (!user) return [];

    const projectsSnapshot = await getDocs(query(collection(db, "teamMembers"), where("userId", "==", user.uid)));

    const projectDocRefs = await Promise.all(projectsSnapshot.docs.map(async document => {
      return await getDoc(doc(db, "projects", document.data().projectId));
    }));

    const projects = projectDocRefs.map(docRef => {
      if (!docRef.exists()) throw new Error("Could not retrieve project document");

      const data = docRef.data();
      return { 
        ...data, 
        startDate: timestampToDateTime(data.startDate),
        endDate: timestampToDateTime(data.endDate),
        id: docRef.id 
      } as Project;
    });

    setProjects(projects);
  }
  
  const addProject = async (projectData: ProjectData, ownerId: string) => {
    await runTransaction(db, async (transaction) => {
      const projectDocRef = doc(collection(db, "projects"));

      transaction.set(projectDocRef, {
        ...projectData,
        startDate: dateTimeToTimestamp(projectData.startDate),
        endDate: dateTimeToTimestamp(projectData.endDate),
      });

      transaction.set(doc(db, "teamMembers", ownerId + projectDocRef.id), {
        projectId: projectDocRef.id,
        role: ROLE.OWNER,
        userId: ownerId
      });
    });

    fetchProjects();
  }

  const updateProject = async (projectId: string, projectData: ProjectData) => {
    await updateDoc(doc(db, "projects", projectId), {
      ...projectData,
      startDate: dateTimeToTimestamp(projectData.startDate),
      endDate: dateTimeToTimestamp(projectData.endDate)
    })
    fetchProjects();
  }

  const deleteProject = async (project: Project) => {
    const teamMemberSnapshot = await getDocs(query(collection(db, "teamMembers"), where("projectId", "==", project.id)));
    const ticketSnapshot = await getDocs(query(collection(db, "tickets"), where("projectId", "==", project.id)));
    const invitationSnapshot = await getDocs(query(collection(db, "invitations"), where("projectId", "==", project.id)));

    await runTransaction(db, async (transaction) => {
      transaction.delete(doc(db, "projects", project.id));
      
      for (const teamMemberDoc of teamMemberSnapshot.docs) {
        transaction.delete(teamMemberDoc.ref);
      }

      for (const ticketDoc of ticketSnapshot.docs) {
        transaction.delete(ticketDoc.ref);
      }

      for (const invitationDoc of invitationSnapshot.docs) {
        transaction.delete(invitationDoc.ref);
      }
    });

    fetchProjects();
  }

  const addTeamMember = async (userId: string, projectId: string, role: ROLE) => {
    if (role === ROLE.OWNER) {
      const ownerDoc = await getDocs(query(collection(db, "teamMembers"), and(where("role", "==", ROLE.OWNER), where("projectId", "==", projectId))));
      updateDoc(ownerDoc.docs[0]?.ref, { role: ROLE.PROJECT_ADMIN });
    }
    
    setDoc(doc(db, "teamMembers", userId + projectId), {
      projectId: projectId,
      role: role,
      userId: userId
    });


    fetchProjects();
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

    fetchProjects();
  }
  
  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!user) return;

      setUserRoles(await fetchTeamMembers(["userId", "==", user.uid]));
    }

    fetchUserRoles();
  }, [projects]);

  useEffect(() => {
    const getProjects = async () => {
      fetchProjects();
    }

    getProjects();
  }, [user]);

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    addTeamMember,
    removeTeamMember,
    hasRole
  };

  return (
    <ProjectContext.Provider value={value}>{ children }</ProjectContext.Provider>
  );
}