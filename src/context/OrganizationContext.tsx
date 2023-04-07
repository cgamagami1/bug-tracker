import { ReactNode, createContext } from "react";
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
  id: number;
  title: string;
  submitterId: number;
  developerId: number;
  status: STATUS;
  priority: PRIORITY;
  dateCreated: DateTime;
}

export type Project = {
  id: number;
  title: string;
  description: string;
  startDate: DateTime | null;
  endDate: DateTime | null;
}

export enum ROLE {
  ADMIN = "Admin",
  PROJECT_MANAGER = "Project Manager",
  SUBMITTER = "Submitter",
  DEVELOPER = "Developer"
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: ROLE;
}

const tickets = [
  {
    id: 0,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 1,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 2,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 3,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 4,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 5,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 6,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 7,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 8,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 9,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 10,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 11,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 12,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 13,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 14,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 15,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 16,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
  {
    id: 17,
    title: "Do thing",
    submitterId: 0,
    developerId: 1,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.MEDIUM,
    dateCreated: DateTime.now()
  },
];
const projects = [
  {
    id: 0,
    title: "Mobile app",
    description: "The mobile app for our new product.",
    startDate: DateTime.now(),
    endDate: DateTime.now()
  },
  {
    id: 1,
    title: "Web app",
    description: "The web app for our new product.",
    startDate: DateTime.now(),
    endDate: DateTime.now()
  },
  {
    id: 2,
    title: "Desktop app",
    description: "The desktop app for our new product.",
    startDate: DateTime.now(),
    endDate: DateTime.now()
  }
]
const users = [
  {
    id: 0,
    name: "john1",
    email: "john@email.com",
    role: ROLE.DEVELOPER,
  },
  {
    id: 1,
    name: "john2",
    email: "john@email.com",
    role: ROLE.DEVELOPER,
  },
  {
    id: 2,
    name: "john3",
    email: "john@email.com",
    role: ROLE.DEVELOPER,
  },
  {
    id: 3,
    name: "john4",
    email: "john@email.com",
    role: ROLE.DEVELOPER,
  },
  {
    id: 4,
    name: "john5",
    email: "john@email.com",
    role: ROLE.DEVELOPER,
  },
  {
    id: 5,
    name: "john6",
    email: "john@email.com",
    role: ROLE.DEVELOPER,
  },
  {
    id: 6,
    name: "john7",
    email: "john@email.com",
    role: ROLE.DEVELOPER,
  },
]

type OrganizationContextValue = {
  tickets: Ticket[];
  projects: Project[];
  users: User[];
}

export const OrganizationContext = createContext({} as OrganizationContextValue);

type TicketProviderProps = {
  children: ReactNode;
}

export const OrganizationProvider = ({ children }: TicketProviderProps) => {
  const value = {
    tickets,
    projects,
    users
  }

  return (
    <OrganizationContext.Provider value={value}>{ children }</OrganizationContext.Provider>
  );
}