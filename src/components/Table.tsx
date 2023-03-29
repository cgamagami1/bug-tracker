import { ReactNode, Dispatch, SetStateAction, useState } from "react";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

type ShownEntries = {
  firstShownEntry: number;
  lastShownEntry: number;
}

type TableProps = {
  title: string;
  shownEntries: ShownEntries;
  setShownEntries: Dispatch<SetStateAction<ShownEntries>>;
  totalEntries: number;
  children: ReactNode;
}

const Table = ({ title, shownEntries, setShownEntries, totalEntries, children }: TableProps) => {
  const lastPage = Math.floor(totalEntries / 5);
  const [currentPage, setCurrentPage] = useState(0);
  const [firstShownPageButton, setFirstShownPageButton] = useState(0);
  const totalShownPageButtons = Math.min(lastPage + 1, 3);
  const lastShownPageButton = firstShownPageButton + (totalShownPageButtons - 1);

  const handleOnSetPage = (newPage: number) => {
    newPage = Math.max(0, Math.min(newPage, lastPage));

    setCurrentPage(newPage);
    
    if (newPage > lastShownPageButton) {
      setFirstShownPageButton(newPage - (totalShownPageButtons - 1));
    }
    else if (newPage < firstShownPageButton) {
      setFirstShownPageButton(newPage);
    }

    setShownEntries({ 
      firstShownEntry: newPage * 5, 
      lastShownEntry: Math.min(newPage * 5 + 4, totalEntries - 1) 
    });
  }

  const handleOnNextPage = () => {
    handleOnSetPage(currentPage + 1);
  }

  const handleOnPreviousPage = () => {
    handleOnSetPage(currentPage - 1);
  }

  return (
    <div className="bg-white rounded-md px-4 md:px-6 py-2">
      <h3 className="text-xl p-4">{ title }</h3>

      <table className="text-left border-t border-b border-gray-400 w-full">
        { children }
      </table>

      <div className="flex flex-col md:flex-row gap-2 justify-between p-4 items-center select-none">
        <span>Showing { shownEntries.firstShownEntry + 1 } to { shownEntries.lastShownEntry + 1 } of { totalEntries } entries</span>
        <div className="flex gap-2">
          <img className="border w-6 py-1 text-center rounded-md hover:cursor-pointer" src={left} alt="left arrow" onClick={handleOnPreviousPage} />

          <span className={`border w-6 py-1 text-center rounded-md hover:cursor-pointer ${currentPage === firstShownPageButton ? "bg-purple-500 text-white" : ""}`} 
            onClick={() => handleOnSetPage(firstShownPageButton)}>{ firstShownPageButton + 1 }</span>
          {
            totalShownPageButtons >= 2 &&
            <span className={`border w-6 py-1 text-center rounded-md hover:cursor-pointer ${currentPage === firstShownPageButton + 1 ? "bg-purple-500 text-white" : ""}`} 
              onClick={() => handleOnSetPage(firstShownPageButton + 1)}>{ firstShownPageButton + 2 }</span>
          }
          {
            totalShownPageButtons >= 3 &&
            <span className={`border w-6 py-1 text-center rounded-md hover:cursor-pointer ${currentPage === firstShownPageButton + 2 ? "bg-purple-500 text-white" : ""}`} 
              onClick={() => handleOnSetPage(firstShownPageButton + 2)}>{ firstShownPageButton + 3 }</span>
          }
          <img className="border w-6 py-1 text-center rounded-md hover:cursor-pointer" src={right} alt="right arrow" onClick={handleOnNextPage} />
        </div>
      </div>
    </div>
  );
}

export default Table;