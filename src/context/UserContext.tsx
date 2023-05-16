import { User, onAuthStateChanged, createUserWithEmailAndPassword, updateEmail } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth, db, storage } from "../utils/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

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
  createUser: (userData: UserData, password: string) => void;
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

  const createUser = async (baseUserData: BaseUserData, password: string) => {
    const { user: createdUser } = await createUserWithEmailAndPassword(auth, baseUserData.email, password);

    const profilePicture = await getDownloadURL(ref(storage, "profilePictures/pexels-pok-rie-130574.jpg"));

    updateUserData({ ...baseUserData, profilePicture }, createdUser);
  }

  const updateUserData = async (userData: UserData | UpdatedUserData, createdUser?: User) => {
    const id = user?.uid ?? createdUser?.uid ?? null;

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
    const unsubscribe = onAuthStateChanged(auth, setUser);

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
    updateUserData,
    isUserLoading
  }

  return (
    <UserContext.Provider value={value}>{ children }</UserContext.Provider>
  );
}