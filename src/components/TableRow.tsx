import { ReactNode } from "react";

type TableRowData = {
  children: ReactNode;
}

const TableRow = ({ children }: TableRowData) => {
  return (
    <tr className="border-t border-gray-200">
      { children }
    </tr>
  );
}

export default TableRow;