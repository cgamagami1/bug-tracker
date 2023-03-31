import { DateTime } from "luxon";
import { useState } from "react";

export type SortAlgorithm<T> = {
  attribute: keyof T | null;
  isReversed: boolean;
}

export type ShownEntries = {
  firstShownEntry: number;
  lastShownEntry: number;
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

const useTable = <T extends {}>(entries: T[]) => {
  const [sortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm<T>>({ attribute: null, isReversed: false });
  const [shownEntries, setShownEntries] = useState<ShownEntries>({ firstShownEntry: 0, lastShownEntry: Math.min(4, entries.length - 1) });

  const sortedEntries = [...entries].sort(newSortAlgorithm(sortAlgorithm))
    .filter((_, i) => (shownEntries.firstShownEntry <= i && i <= shownEntries.lastShownEntry));

  return { sortedEntries, sortAlgorithm, setSortAlgorithm, shownEntries, setShownEntries };
}

export default useTable;