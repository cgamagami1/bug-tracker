import { ReactNode, Dispatch, SetStateAction, useState } from "react";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import { PageButtons } from "../utils/useTable";

type TableProps = {
  title: string;
  showingEntriesText: string;
  currentPage: number;
  pageButtons: PageButtons;
  handleOnNewPage: (newPage: number) => void; 
  children: ReactNode;
}

const Table = ({ title, showingEntriesText, currentPage, pageButtons, handleOnNewPage, children }: TableProps) => {

  const handleOnNextPage = () => {
    handleOnNewPage(currentPage + 1);
  }

  const handleOnPreviousPage = () => {
    handleOnNewPage(currentPage - 1);
  }

  return (
    <div className="bg-white rounded-md px-6 py-2 flex-grow text-sm">
      <h3 className="text-xl p-2">{ title }</h3>

      <table className="text-left border-t border-b border-gray-400 w-full">
        { children }
      </table>

      <div className="flex flex-col md:flex-row gap-2 justify-between p-2 items-center select-none">
        <span>{ showingEntriesText }</span>
        <div className="flex gap-2">
          <img className="border w-6 py-1 text-center rounded-md hover:cursor-pointer" src={left} alt="left arrow" onClick={handleOnPreviousPage} />

          <span className={`border w-6 py-1 text-center rounded-md hover:cursor-pointer ${currentPage === pageButtons.firstPageButton ? "bg-purple-500 text-white" : ""}`} 
            onClick={() => handleOnNewPage(pageButtons.firstPageButton)}>{ pageButtons.firstPageButton + 1 }</span>
          {
            pageButtons.secondPageButton !== null &&
            <span className={`border w-6 py-1 text-center rounded-md hover:cursor-pointer ${currentPage === pageButtons.secondPageButton ? "bg-purple-500 text-white" : ""}`} 
              onClick={() => handleOnNewPage(pageButtons.secondPageButton!)}>{ pageButtons.secondPageButton! + 1 }</span>
          }
          {
            pageButtons.thirdPageButton !== null &&
            <span className={`border w-6 py-1 text-center rounded-md hover:cursor-pointer ${currentPage === pageButtons.thirdPageButton ? "bg-purple-500 text-white" : ""}`} 
              onClick={() => handleOnNewPage(pageButtons.thirdPageButton!)}>{ pageButtons.thirdPageButton! + 1 }</span>
          }
          <img className="border w-6 py-1 text-center rounded-md hover:cursor-pointer" src={right} alt="right arrow" onClick={handleOnNextPage} />
        </div>
      </div>
    </div>
  );
}

export default Table;