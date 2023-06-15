import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Modal from "../../components/Modal";
import { TicketContext, Ticket, STATUS } from "../../context/TicketContext";
import Button from "../../components/Button";
import { useErrorBoundary } from "react-error-boundary";
import { FirebaseError } from "firebase/app";

type StatusMenuProps = {
  ticket: Ticket;
  handleOnCloseMenu: () => void;
}

const StatusMenu = ({ ticket, handleOnCloseMenu }: StatusMenuProps) => {
  const { setTicketStatus } = useContext(TicketContext);
  const [status, setStatus] = useState(ticket.status);
  const [isLoading, setIsLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();  

  const handleOnSetStatus = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await setTicketStatus(ticket, status);
    }
    catch (error) {
      if ((error as FirebaseError).code === "permission-denied") showBoundary(error);
    }
    setIsLoading(false);
    handleOnCloseMenu();
  }

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as STATUS);

  return (
    <Modal handleOnSubmit={handleOnSetStatus}>
      <label htmlFor="status" className="text-lg text-center">Set Status: <br /> "{ ticket.title }" </label>
      <select className="h-10 bg-gray-100 rounded-md w-full focus:outline-none p-2" id="status" value={status} onChange={handleOnChange}>
        <option value={STATUS.OPEN}>Open</option>
        <option value={STATUS.IN_PROGRESS}>In Progress</option>
        <option value={STATUS.CLOSED}>Closed</option>
      </select>
      <Button title="Submit" type="submit" isLoading={isLoading} />
    </Modal>
  );
}

export default StatusMenu;