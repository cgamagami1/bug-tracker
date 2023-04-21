import { useState, useEffect } from "react";
import { Ticket } from "../context/TicketContext";
import { timestampToDateTime } from "./date-conversion";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config";

const useGetTicket = (ticketId: string | null | undefined) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  
  useEffect(() => {
    const getTicket = async () => {
      if (!ticketId) return;

      const ticketRef = await getDoc(doc(db, "tickets", ticketId));

      if (!ticketRef.exists()) throw new Error("Could not retrieve ticket");

      setTicket({
        ...ticketRef.data(),
        id: ticketRef.id,
        dateCreated: timestampToDateTime(ticketRef.data().dateCreated)
      } as Ticket);
    }

    getTicket();
  }, []);

  return ticket;
}

export default useGetTicket;