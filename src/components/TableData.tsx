import { ReactNode } from "react";

type TableDataProps = {
  hideOnMobile?: boolean;
  children: ReactNode;
}

const TableData = ({ hideOnMobile, children }: TableDataProps) => {
  return (
    <td className={`p-2 ${hideOnMobile ? "hidden lg:table-cell" : ""}`}>
      { children }
    </td>
  );
}

export default TableData;