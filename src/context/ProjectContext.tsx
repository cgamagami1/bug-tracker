import { Dispatch, ReactNode, SetStateAction, createContext, useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { where, query, getDocs, collection, QuerySnapshot } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { UserContext } from "./UserContext";

export type Project = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  startDate: DateTime | null;
  endDate: DateTime | null;
}

type ProjectContextValue = {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
}

export const ProjectContext = createContext({} as ProjectContextValue);

type ProjectProviderProps = {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getProjects = async () => {
      const querySnapshot = await getDocs(query(collection(db, "projects"), where("ownerId", "==", user?.uid)));

      setProjects(querySnapshot.docs.map(doc => ({ 
        ...doc.data(), 
        startDate: doc.data().startDate === null ? null : DateTime.fromJSDate(doc.data().startDate.toDate()),
        endDate:doc.data().endDate === null ? null : DateTime.fromJSDate(doc.data().endDate.toDate()),
        id: doc.id 
      } as Project)));
    }

    if (user) getProjects();
  }, [user]);

  const value = {
    projects,
    setProjects
  };

  return (
    <ProjectContext.Provider value={value}>{ children }</ProjectContext.Provider>
  );
}