import { DateTime } from "luxon";
import Table from "../../components/Table";
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
  const tableEdits = [
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
    {
      id: 5,
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
    showingEntriesText,
    currentPage,
    pageButtons,
    handleOnNewPage
  } = useTable(tableEdits);

  return (
    <Table title="Ticket History" showingEntriesText={showingEntriesText} currentPage={currentPage} pageButtons={pageButtons} handleOnNewPage={handleOnNewPage}>
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
          sortedEntries.map(tableEdit => (
            <TableRow key={tableEdit.id}>
              <TableData>{ tableEdit.property }</TableData>
              <TableData>{ tableEdit.oldValue }</TableData>
              <TableData>{ tableEdit.newValue }</TableData>
              <TableData>{ tableEdit.dateChanged.toISODate() }</TableData>
            </TableRow>
          ))
        }
      </tbody>
    </Table>
  );
}

export default TicketHistoryTable;