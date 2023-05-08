import { DateTime } from "luxon";
import TableContainer from "../../components/TableContainer";
import useTable from "../../utils/useTable";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import TableData from "../../components/TableData";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import { timestampToDateTime } from "../../utils/date-conversion";
import { TicketMenuData } from "../../context/TicketContext";
import { TeamMemberContext } from "../../context/TeamMemberContext";

const propertyTitle = (property: string) => {
  switch (property) {
    case "developerId":
      return "Developer";
    default:
      return property.charAt(0).toUpperCase() + property.slice(1);
  }
}

export type TicketEdit<T> = {
  id: string;
  property: string;
  oldValue: T;
  newValue: T;
  dateChanged: DateTime;
}

type TicketHistoryTableProps = {
  ticketId: string;
}

const TicketHistoryTable = ({ ticketId }: TicketHistoryTableProps) => {
  const [ticketEdits, setTicketEdits] = useState<TicketEdit<TicketMenuData[keyof TicketMenuData]>[]>([]);
  const { getTeamMemberName } = useContext(TeamMemberContext);

  useEffect(() => {
    const getTicketEdits = async () => {
      const ticketEditSnapshot = await getDocs(collection(db, "tickets", ticketId, "ticketEdits"));

      const ticketEditList = ticketEditSnapshot.docs.map(document => {
        const docData = document.data();

        return {
          id: document.id,
          property: docData.property,
          oldValue: docData.oldValue,
          newValue: docData.newValue,
          dateChanged: timestampToDateTime(docData.dateChanged)
        } as TicketEdit<typeof docData.newValue>;
      });

      setTicketEdits(ticketEditList);
    }

    getTicketEdits();
  }, []);

  const {
    sortedEntries,
    sortAlgorithm,
    setSortAlgorithm,
    currentPage,
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(ticketEdits, 5, { attribute: "dateChanged", isReversed: true });

  return (
    <TableContainer title="Ticket History" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo} hideOnMobile>
      <table>
        <thead>
          <tr>
            <TableHeader title="Property" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute={"property"} />
            <TableHeader title="Old Value" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute={"oldValue"} />
            <TableHeader title="New Value" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute={"newValue"} />
            <TableHeader title="Date Changed" sortAlgorithm={sortAlgorithm} setSortAlgorithm={setSortAlgorithm} headerAttribute={"dateChanged"} />
          </tr>
        </thead>

        <tbody>
          {
            sortedEntries.map(ticketEdit => (
              <TableRow key={ticketEdit.id}>
                <TableData>{ propertyTitle(ticketEdit.property) }</TableData>
                <TableData>{ ticketEdit.property === "developerId" ? getTeamMemberName(ticketEdit.oldValue) : ticketEdit.oldValue }</TableData>
                <TableData>{ ticketEdit.property === "developerId" ? getTeamMemberName(ticketEdit.newValue) : ticketEdit.newValue }</TableData>
                <TableData>{ ticketEdit.dateChanged.toISODate() }</TableData>
              </TableRow>
            ))
          }
        </tbody>
      </table>
    </TableContainer>
  );
}

export default TicketHistoryTable;