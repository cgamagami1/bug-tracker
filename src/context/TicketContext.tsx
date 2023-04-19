import { ReactNode, createContext, useState } from "react";
import { DateTime } from "luxon";

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
  tickets: Ticket[];
}

export const TicketContext = createContext({} as TicketContextValue);

type TicketProviderProps = {
  children: ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const value = {
    tickets
  };

  return (
    <TicketContext.Provider value={value}>{ children }</TicketContext.Provider>
  );
}