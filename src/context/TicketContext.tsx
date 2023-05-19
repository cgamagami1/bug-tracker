import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { UserContext } from "./UserContext";
import { collection, getDocs, query, where, deleteDoc, doc, addDoc, updateDoc, serverTimestamp, runTransaction, getDoc, setDoc } from "firebase/firestore";
import { timestampToDateTime } from "../utils/date-conversion";
import { db } from "../utils/firebase-config";
import { ProjectContext, getTeamMemberName } from "./ProjectContext";

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

export type TicketMenuData = {
  title: string;
  description: string;
  submitterId: string;
  developerId: string;
  projectId: string;
  priority: PRIORITY;
}

export type Ticket = { 
  id: string; 
  status: STATUS;
  dateCreated: DateTime;
  dateClosed: DateTime;
  developerName: string;
  submitterName: string;
} & TicketMenuData;

type TicketContextValue = {
  tickets: Ticket[];
  addTicket: (ticketData: TicketMenuData) => Promise<string>;
  updateTicket: (ticketId: string, ticketData: TicketMenuData) => void;
  deleteTicket: (ticket: Ticket) => void;
  setTicketStatus: (ticket: Ticket, status: STATUS) => void;
}

export const TicketContext = createContext({} as TicketContextValue);

type TicketProviderProps = {
  children: ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const { user } = useContext(UserContext);
  const { projects } = useContext(ProjectContext);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    if (!user) return []; 

    const ticketSnapshots = await Promise.all(projects.map(project => getDocs(query(collection(db, "tickets"), where("projectId", "==", project.id)))));

    return (await Promise.all(ticketSnapshots.map(async (snapshot) => {
      return await Promise.all(snapshot.docs.map(async (document) => {
        const data = document.data();

        return {
          ...data,
          id: document.id,
          developerName: await getTeamMemberName(data.developerId),
          submitterName: await getTeamMemberName(data.submitterId) ,
          dateCreated: timestampToDateTime(data.dateCreated),
          dateClosed: timestampToDateTime(data.dateClosed)
        } as Ticket;
      }));
    }))).flat();
  }

  const addTicket = async (ticketData: TicketMenuData): Promise<string> => {
    const ticketDoc = await addDoc(collection(db, "tickets"), {
      ...ticketData,
      status: STATUS.OPEN,
      dateCreated: serverTimestamp(),
      dateClosed: null
    });

    setTickets(await fetchTickets());
    return ticketDoc.id;
  }

  const setTicketStatus = async (ticket: Ticket, status: STATUS) => {
    await updateDoc(doc(db, "tickets", ticket.id), { 
      status,
      dateClosed: status === STATUS.CLOSED ? serverTimestamp() : null  
    });

    setTickets(await fetchTickets());
  }

  const updateTicket = async (ticketId: string, ticketData: TicketMenuData) => {
    const ticket = tickets.find(ticket => ticket.id === ticketId);

    if (!ticket) throw new Error("Could not find ticket");

    await runTransaction(db, async (transaction) => {
      transaction.update(doc(db, "tickets", ticketId), ticketData);

      for (const key of Object.keys(ticketData)) {
        const newValue = ticketData[key as keyof TicketMenuData];
        const oldValue = ticket[key as keyof TicketMenuData];

        if (oldValue !== newValue) {
          transaction.set(doc(collection(db, "tickets", ticketId, "ticketEdits")), {
            property: key,
            oldValue,
            newValue,
            dateChanged: serverTimestamp()
          });
        }
      }
    })

    setTickets(await fetchTickets());
  }

  const deleteTicket = async (ticket: Ticket) => {
    await deleteDoc(doc(db, "tickets", ticket.id));

    setTickets(await fetchTickets());
  }

  useEffect(() => {
    const getMyTickets = async () => {
      setTickets(await fetchTickets());
    }

    getMyTickets();
  }, [projects]);

  const value = {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    setTicketStatus
  };

  return (
    <TicketContext.Provider value={value}>{ children }</TicketContext.Provider>
  );
}