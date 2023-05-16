import { Invitation } from "../context/ProjectContext";

type InboxProps = {
  myInvitations: Invitation[];
  acceptInvitation: (invitation: Invitation) => void;
  declineInvitation: (invitation: Invitation) => void;
}

const Inbox = ({ myInvitations, acceptInvitation, declineInvitation }: InboxProps) => {

  return (
    <div className="w-96 h-64 bg-white border border-gray-100 shadow-md absolute top-12 right-6 rounded-md px-4">
      { myInvitations.length !== 0 ? myInvitations.map(invitation => (
        <div key={invitation.id} className="w-full border-b border-gray-300 py-3 text-sm">
          <p>You have an invitation to join "{ invitation.projectName }"</p>
          <span className="mr-2 text-purple-600 underline hover:cursor-pointer" onClick={() => acceptInvitation(invitation)}>Accept</span>
          <span className="text-purple-600 underline hover:cursor-pointer" onClick={() => declineInvitation(invitation)}>Decline</span>
        </div>
      )) : 
      <p className="text-center h-full pt-28">Your Inbox Is Empty</p> }
    </div>
  );
}

export default Inbox;