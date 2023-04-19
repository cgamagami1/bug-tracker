import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { where, query, getDocs, collection, getDoc, updateDoc, doc, runTransaction, DocumentSnapshot, DocumentData} from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { UserContext } from "./UserContext";
import { dateTimeToTimestamp, timestampToDateTime } from "../utils/date-conversion";
import { ROLE } from "./TeamMemberContext";

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
  updateProject: (projectId: string, projectData: ProjectData) => Promise<void>
}

export const ProjectContext = createContext({} as ProjectContextValue);

type ProjectProviderProps = {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useContext(UserContext);
  
  const fetchProjects = async () => {
    if (!user) return [];

    const userDocRef = await getDoc(doc(db, "users", user.uid));

    if (!userDocRef.exists()) throw new Error("Could not retrieve user document");

    const projectDocRefs = await Promise.all(userDocRef.data().projects.map(async (project: string) => {
      return await getDoc(doc(db, "projects", project));
    }));

    return projectDocRefs.map(docRef => {
      if (!docRef.exists()) throw new Error("Could not retrieve project document");

      const data = docRef.data();
      return { 
        ...data, 
        startDate: timestampToDateTime(data.startDate),
        endDate: timestampToDateTime(data.endDate),
        id: docRef.id 
      } as Project;
    });
  }

  const addProject = async (projectData: ProjectData, ownerId: string) => {
    await runTransaction(db, async (transaction) => {
      const projectDocRef = doc(collection(db, "projects"));

      transaction.set(projectDocRef, {
        ...projectData,
        startDate: dateTimeToTimestamp(projectData.startDate),
        endDate: dateTimeToTimestamp(projectData.endDate)
      });

      transaction.set(doc(projectDocRef, "team members", ownerId), {
        role: ROLE.OWNER
      });

      transaction.update(doc(db, "users", ownerId), {
        projects: [projectDocRef.id]
      });
    });

    setProjects(await fetchProjects());
  }

  const updateProject = async (projectId: string, projectData: ProjectData) => {
    await updateDoc(doc(db, "projects", projectId), {
      ...projectData,
      startDate: dateTimeToTimestamp(projectData.startDate),
      endDate: dateTimeToTimestamp(projectData.endDate)
    })
    setProjects(await fetchProjects());
  }

  useEffect(() => {
    const getProjects = async () => {
      setProjects(await fetchProjects())
    }

    getProjects();
  }, [user]);

  const value = {
    projects,
    addProject,
    updateProject
  };

  return (
    <ProjectContext.Provider value={value}>{ children }</ProjectContext.Provider>
  );
}