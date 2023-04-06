import { DateTime } from "luxon";
import TableContainer from "../../components/TableContainer";
import useTable from "../../utils/useTable";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import TableData from "../../components/TableData";

export type TicketEdits<T> = {
  id: number;
  property: string;
  oldValue: T;
  newValue: T;
  dateChanged: DateTime;
}

const TicketHistoryTable = () => {
  const ticketEdit = [
    {
      id: 0,
      property: "title",
      oldValue: "Do This",
      newValue: "Do That",
      dateChanged: DateTime.now()
    },
    {
      id: 1,
      property: "title",
      oldValue: "Do This",
      newValue: "Do That",
      dateChanged: DateTime.now()
    },
    {
      id: 2,
      property: "title",
      oldValue: "Do This",
      newValue: "Do That",
      dateChanged: DateTime.now()
    },
    {
      id: 3,
      property: "title",
      oldValue: "Do This",
      newValue: "Do That",
      dateChanged: DateTime.now()
    },
    {
      id: 4,
      property: "title",
      oldValue: "Do This",
      newValue: "Do That",
      dateChanged: DateTime.now()
    },
    
  ];

  const {
    sortedEntries,
    sortAlgorithm,
    setSortAlgorithm,
    currentPage,
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(ticketEdit);

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
                <TableData>{ ticketEdit.property }</TableData>
                <TableData>{ ticketEdit.oldValue }</TableData>
                <TableData>{ ticketEdit.newValue }</TableData>
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