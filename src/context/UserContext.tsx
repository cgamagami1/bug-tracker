import { User, onAuthStateChanged, createUserWithEmailAndPassword, updateEmail, signInAnonymously } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth, db, storage } from "../utils/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import _ from "lodash";

type BaseUserData = {
  firstName: string;
  lastName: string;
  email: string;
}

export type UserData = BaseUserData & { profilePicture: string };
export type UpdatedUserData = BaseUserData & { 
  profilePicture: File | string;
  password: string; 
}

type UserContextValue = {
  user: User | null;
  userData: UserData;
  createUser: (userData: BaseUserData, password: string) => Promise<User>;
  createAnonymousUser: (baseUserData: BaseUserData) => Promise<User>;
  updateUserData: (userData: UserData | UpdatedUserData) => void;
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

  const createAnonymousUser = async (baseUserData: BaseUserData): Promise<User> => {
    const { user: createdUser } = await signInAnonymously(auth);

    await updateUserData({ 
      ...baseUserData, 
      profilePicture: await getDownloadURL(ref(storage, "profilePictures/pexels-pok-rie-130574.jpg"))
    }, createdUser);
    return createdUser;
  }

  const createUser = async (baseUserData: BaseUserData, password: string): Promise<User> => {
    const { user: createdUser } = await createUserWithEmailAndPassword(auth, baseUserData.email, password);

    updateUserData({ 
      ...baseUserData, 
      profilePicture: await getDownloadURL(ref(storage, "profilePictures/pexels-pok-rie-130574.jpg"))
    }, createdUser);
    return createdUser;
  }

  const updateUserData = async (userData: UserData | UpdatedUserData, createdUser?: User) => {
    const id = createdUser?.uid ?? user?.uid ?? null;

    if (!id) throw new Error("Cannot update user: No user authenticated");

    const fileToURL = async (pfp: File | string) => {
      if (typeof pfp === "string") return pfp;

      const picRef = ref(storage, `profilePictures/${id}`);
      await uploadBytes(picRef, pfp);
      return await getDownloadURL(picRef);
    }

    await setDoc(doc(db, "users", id), { 
      firstName: userData.firstName, 
      lastName: userData.lastName,
      email: userData.email,
      profilePicture: await fileToURL(userData.profilePicture)
    });

    if (user) await updateEmail(user, userData.email);
  } 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(_.cloneDeep(user)));

    return unsubscribe;
  }, []);


  useEffect(() => {
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

    fetchUserData();
  }, [user]);

  const value = {
    user,
    userData,
    createUser,
    createAnonymousUser,
    updateUserData,
    isUserLoading
  }

  return (
    <UserContext.Provider value={value}>{ children }</UserContext.Provider>
  );
}