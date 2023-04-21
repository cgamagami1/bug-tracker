import { DateTime } from "luxon";
import { useState } from "react";

export type SortAlgorithm<T> = {
  attribute: keyof T | null;
  isReversed: boolean;
}

const newSortAlgorithm = <T>(sortAlgorithm: SortAlgorithm<T>) => {
  const { attribute, isReversed } = sortAlgorithm;
  return (a: T, b: T) => {
    if (!attribute) return 0;

    const val1 = isReversed ? b[attribute] : a[attribute];
    const val2 = isReversed ? a[attribute] : b[attribute];

    if (typeof val1 === "string" && typeof val2 === "string") {
      return val1.localeCompare(val2);
    }
    else if (typeof val1 === "number" && typeof val2 === "number") {
      return val1 - val2;
    }
    else if (val1 instanceof DateTime && val2 instanceof DateTime) {
      return Number(val1) - Number(val2);
    }

    return 0;
  };
}

const useTable = <T extends {}>(entries: T[], entriesPerPage = 5, defaultSortAlgorithm: SortAlgorithm<T> = { attribute: null, isReversed: false } ) => {
  const [sortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm<T>>(defaultSortAlgorithm);
  const [currentPage, setCurrentPage] = useState(0);
  const firstShownEntry = currentPage * entriesPerPage;
  const lastPage = Math.ceil(entries.length / entriesPerPage) - 1;
  const [firstShownPageButton, setFirstShownPageButton] = useState(0);

  const handleOnNewPage = (newPage: number) => {
    newPage = Math.max(0, Math.min(newPage, lastPage));

    if (firstShownPageButton + 2 < newPage) {
      setFirstShownPageButton(newPage - 2);
    }

    if (newPage < firstShownPageButton) {
      setFirstShownPageButton(newPage);
    }

    setCurrentPage(newPage);
  }

  const sortedEntries = [...entries].sort(newSortAlgorithm(sortAlgorithm))
    .filter((_, i) => (firstShownEntry <= i && i < firstShownEntry + entriesPerPage));

  return { 
    sortedEntries, 
    sortAlgorithm, 
    setSortAlgorithm, 
    currentPage, 
    handleOnNewPage,
    firstShownPageButton,
    footerInfo: {
      firstShownEntry,
      entriesPerPage,
      totalEntries: entries.length
    } 
  };
}

export default useTable;