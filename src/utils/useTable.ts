import { DateTime } from "luxon";
import { useState } from "react";

export type SortAlgorithm<T> = {
  attribute: keyof T | null;
  isReversed: boolean;
}

export type PageButtons = {
  firstPageButton: number;
  secondPageButton: number | null;
  thirdPageButton: number | null;
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

const useTable = <T extends {}>(entries: T[], entriesPerPage = 5) => {
  const [sortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm<T>>({ attribute: null, isReversed: false });
  const [firstShownEntry, setFirstShownEntry] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const lastPage = Math.ceil(entries.length / entriesPerPage);
  const [pageButtons, setPageButtons] = useState<PageButtons>({
    firstPageButton: 0,
    secondPageButton: (entries.length / entriesPerPage) > 1 ? 1 : null,
    thirdPageButton: (entries.length / (entriesPerPage * 2) > 1 ? 1 : null)
  });
  const showingEntriesText = `Showing ${firstShownEntry + 1} to ${Math.min(firstShownEntry + entriesPerPage, entries.length)} of ${entries.length} entries`;

  const handleOnNewPage = (newPage: number) => {
    newPage = Math.max(0, Math.min(newPage, lastPage));

    setCurrentPage(newPage);

    if (pageButtons.secondPageButton && pageButtons.thirdPageButton) {
      if (pageButtons.thirdPageButton < newPage) {
        setPageButtons({
          firstPageButton: pageButtons.firstPageButton++,
          secondPageButton: pageButtons.secondPageButton++,
          thirdPageButton: pageButtons.thirdPageButton++
        });
      }
      else if (newPage < pageButtons.firstPageButton) {
        setPageButtons({
          firstPageButton: pageButtons.firstPageButton--,
          secondPageButton: pageButtons.secondPageButton--,
          thirdPageButton: pageButtons.thirdPageButton--
        });
      }
    }
    
    setFirstShownEntry(newPage * entriesPerPage);
  }

  const sortedEntries = [...entries].sort(newSortAlgorithm(sortAlgorithm))
    .filter((_, i) => (firstShownEntry <= i && i <= firstShownEntry + entriesPerPage));

  return { sortedEntries, sortAlgorithm, setSortAlgorithm, showingEntriesText, currentPage, pageButtons, handleOnNewPage };
}

export default useTable;