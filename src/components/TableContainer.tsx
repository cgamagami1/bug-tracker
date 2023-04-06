import { ReactNode, Dispatch, SetStateAction, useState } from "react";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

type TableProps = {
  title: string;
  currentPage: number;
  handleOnNewPage: (newPage: number) => void; 
  firstShownPageButton: number;
  footerInfo: {
    firstShownEntry: number;
    entriesPerPage: number;
    totalEntries: number;
  };
  hideOnMobile?: boolean;
  children: ReactNode;
}

const TableContainer = ({ title, currentPage, handleOnNewPage, firstShownPageButton, footerInfo, hideOnMobile, children }: TableProps) => {
  const { firstShownEntry, entriesPerPage, totalEntries } = footerInfo;
  const pageCount = Math.ceil(totalEntries / entriesPerPage);

  const pageButtons: { page: number }[] = [];

  for (let i = 0; i < pageCount; i++) {
    pageButtons[i] = { page: i };
  }

  const handleOnNextPage = () => {
    handleOnNewPage(currentPage + 1);
  }

  const handleOnPreviousPage = () => {
    handleOnNewPage(currentPage - 1);
  }

  return (
    <div className={`bg-white rounded-md px-6 py-2 flex-grow text-sm text-left flex-col ${hideOnMobile ? "hidden lg:flex" : "flex"}`}>
      <h3 className="text-xl p-2 border-b border-gray-400">{ title }</h3>

      { children }

      <div className="flex flex-col md:flex-row gap-2 justify-between p-2 items-center select-none border-t border-gray-400">
        <span>Showing {firstShownEntry + 1} to {Math.min(firstShownEntry + entriesPerPage, totalEntries)} of {totalEntries} entries</span>

        <div className="flex gap-2">
          <img className="border w-6 py-1 text-center rounded-md hover:cursor-pointer" src={left} alt="left arrow" onClick={handleOnPreviousPage} />
          {
            pageButtons
              .filter(({ page }) => firstShownPageButton <= page && page < firstShownPageButton + 3)
              .map(({ page }) => (
              <span key={page} className={`border w-6 py-1 text-center rounded-md hover:cursor-pointer ${currentPage === page ? "bg-purple-500 text-white" : ""}`} 
            onClick={() => handleOnNewPage(page)}>{ page + 1 }</span>
            ))
          }
          <img className="border w-6 py-1 text-center rounded-md hover:cursor-pointer" src={right} alt="right arrow" onClick={handleOnNextPage} />
        </div>
      </div>
    </div>
  );
}

export default TableContainer;