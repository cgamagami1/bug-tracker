import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-config";

type UserContextValue = {
  user: User | null | undefined;
}

export const UserContext = createContext({} as UserContextValue);

type UserProviderProps = {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);

    return unsubscribe;
  }, []);

  const value = {
    user,
  }
  
  return (
    <UserContext.Provider value={value}>{ children }</UserContext.Provider>
  );
}