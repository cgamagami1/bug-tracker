import bell from "../assets/bell.svg";
import menu from "../assets/menu.svg";
import logout from "../assets/log-out.svg";
import Inbox from "./Inbox";
import { useContext, useEffect, useState } from "react";
import { getDocs, query, collection, where, getDoc, doc, deleteDoc } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { db } from "../utils/firebase-config";
import { Invitation } from "../context/ProjectContext";
import { ProjectContext } from "../context/ProjectContext";
import { Link } from "react-router-dom";

type HeaderBarProps = {
  handleOnMenuClick: () => void;
  handleOnInboxClick: () => void;
  isInboxOpen: boolean;
}

const HeaderBar = ({ handleOnMenuClick, handleOnInboxClick, isInboxOpen }: HeaderBarProps) => {
  const [myInvitations, setMyInvitations] = useState<Invitation[]>([]);
  const { user } = useContext(UserContext);
  const { addTeamMember } = useContext(ProjectContext);

  const fetchMyInvitations = async () => {
    const response = await getDocs(query(collection(db, "invitations"), where("userId", "==", user?.uid)));

    const invitations = await Promise.all(response.docs.map(async (document) => {
      const data = document.data();

      const projectDoc = await getDoc(doc(db, "projects", data.projectId));

      if (!projectDoc.exists()) throw new Error("Invitation error: Project does not exist");
      const projectData = projectDoc.data();
      return {
        id: document.id,
        userId: data.userId,
        projectId: data.projectId,
        projectName: projectData.title,
        role: data.role
      }
    }));

    setMyInvitations(invitations);
  }

  const acceptInvitation = async (invitation: Invitation) => {
    addTeamMember(invitation.userId, invitation.projectId, invitation.role);

    await deleteInvitation(invitation);
  }

  const deleteInvitation = async (invitation: Invitation) => {
    await deleteDoc(doc(db, "invitations", invitation.id));

    fetchMyInvitations();
  }

  useEffect(() => {
    fetchMyInvitations();
  }, []);

  return (
    <div className="p-4 shadow-md flex justify-between z-10 sticky top-0 bg-white h-14">
      <div className="flex gap-8">
        <img className="w-6 hover:cursor-pointer" src={menu} alt="menu icon" onClick={handleOnMenuClick} />
        <h1 className="text-xl -translate-y-0.5 text-gray-800">my<span className="font-bold"><span className="text-purple-600">Bug</span>Tracker</span></h1>
      </div>
      <div className="flex gap-6">
        <div className="relative">
          <img className="hover:cursor-pointer" src={bell} alt="notification icon" onClick={handleOnInboxClick} />
          {myInvitations.length !== 0 && <span className="absolute -top-2 -right-1.5 bg-red-600 text-white rounded-full w-4 h-4 text-xs text-center border-2 border-white box-content">{ myInvitations.length }</span>}
        </div>
        <Link to="/signout" >
          <img src={logout} alt="sign out icon" className="hover:cursor-pointer" />
        </Link>
      </div>
      {isInboxOpen && <Inbox myInvitations={myInvitations} acceptInvitation={acceptInvitation} declineInvitation={deleteInvitation} />}
    </div>
  );
}

export default HeaderBar;