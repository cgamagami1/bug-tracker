import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { UserContext } from "./UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { timestampToDateTime } from "../utils/date-conversion";
import { db } from "../utils/firebase-config";

export enum STATUS {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  CLOSED = "Closed"
}

export enum PRIORITY {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

export type Ticket = {
  id: string;
  title: string;
  description: string;
  submitterId: string;
  developerId: string;
  projectId: string;
  type: "Bug" | 'UI';
  status: STATUS;
  priority: PRIORITY;
  dateCreated: DateTime;
}

type TicketContextValue = {
  myTickets: Ticket[];
}

export const TicketContext = createContext({} as TicketContextValue);

type TicketProviderProps = {
  children: ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const { user } = useContext(UserContext);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);

  const fetchMyTickets = async () => {
    // for each project, fetch all tickets if admin/owner/manager, fetch only relevant tickets if developer/submitter
    if (!user) return []; 
    const myTicketsSnapshot = await getDocs(query(collection(db, "tickets"), where("developerId", "==", user?.uid)));

    return myTicketsSnapshot.docs.map(document => {
      return {
        ...document.data(),
        id: document.id,
        dateCreated: timestampToDateTime(document.data().dateCreated),
      } as Ticket;
    });
  }

  useEffect(() => {
    const getMyTickets = async () => {
      setMyTickets(await fetchMyTickets());
    }

    getMyTickets();
  }, [user]);

  const value = {
    myTickets
  };

  return (
    <TicketContext.Provider value={value}>{ children }</TicketContext.Provider>
  );
}