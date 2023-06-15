import { User, onAuthStateChanged, createUserWithEmailAndPassword, updateEmail } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import _ from "lodash";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

export type UserDataWithPassword = UserData & {
  password: string; 
}

type UserContextValue = {
  user: User | null;
  userData: UserData;
  createUser: (userData: UserDataWithPassword) => void;
  updateUserData: (userData: UserData) => void;
  isUserLoading: boolean;
}

export const UserContext = createContext({} as UserContextValue);

type UserProviderProps = {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>({ firstName: "", lastName: "", email: "", profilePicture: "" });
  const [isUserLoading, setIsUserLoading] = useState(true);

  const createUser = async (createdUserData: UserDataWithPassword) => {
    const { user: createdUser } = await createUserWithEmailAndPassword(auth, createdUserData.email, createdUserData.password);

    await setDoc(doc(db, "users", createdUser.uid), createdUserData);
    await fetchUserData();
  }

  const updateUserData = async (updatedUserData: UserData) => {
    if (!user) throw new Error("Cannot update user data: No user authenticated");
    await setDoc(doc(db, "users", user.uid), updatedUserData);
    await updateEmail(user, updatedUserData.email);

    await fetchUserData();
  } 

  const fetchUserData = async () => {
    if (!user) return;
    
    const userDataSnapshot = await getDoc(doc(db, "users", user.uid));
    if (!userDataSnapshot.exists()) throw new Error("Could not retrieve user data");

    const data = userDataSnapshot.data();
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      profilePicture: data.profilePicture
    });
    setIsUserLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(_.cloneDeep(user)));

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) { 
      fetchUserData(); 
    }
    else {
      setIsUserLoading(true);
    }
  }, [user]);

  const value = {
    user,
    userData,
    createUser,
    updateUserData,
    isUserLoading
  }

  return (
    <UserContext.Provider value={value}>{ children }</UserContext.Provider>
  );
}