import { FC, Dispatch, SetStateAction, MouseEvent } from "react";
import up from "../assets/up.svg";
import down from "../assets/down.svg";

type TableHeaderProps<T> = {
  title: string;
  className?: string;
  sortingAlgorithm: (a: T, b: T) => number;
  setSortingAlgorithm: Dispatch<SetStateAction<(a: T, b: T) => number>>;
  headerSortingAlgorithm: (a: T, b: T) => number;
  headerReverseSortingAlgorithm: (a: T, b: T) => number;
}

const TableHeader = <T,>({ 
  title, 
  className, 
  sortingAlgorithm, 
  setSortingAlgorithm, 
  headerSortingAlgorithm, 
  headerReverseSortingAlgorithm 
}: TableHeaderProps<T>) => {
  const isSorted = sortingAlgorithm === headerSortingAlgorithm;
  const isReverseSorted = sortingAlgorithm === headerReverseSortingAlgorithm;

  const handleOnClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (isSorted) {
      setSortingAlgorithm(() => headerReverseSortingAlgorithm);
    }
    else if (isReverseSorted) {
      setSortingAlgorithm(() => (a: T, b: T) => 0);
    }
    else {
      setSortingAlgorithm(() => headerSortingAlgorithm);
    }
  }

  return (
    <th className={`p-4 relative hover:cursor-pointer select-none ${className}`} onClick={handleOnClick}>
      <span>{ title }</span>
      <span className="inline-flex flex-col absolute right-4">
        <img className={`w-3 ${isSorted ? "scale-150" : ""}`} src={up} alt="up icon" />
        <img className={`w-3 ${isReverseSorted ? "scale-150" : ""}`} src={down} alt="down icon" />
      </span>
    </th>
  );
}

export default TableHeader;