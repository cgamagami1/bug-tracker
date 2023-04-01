import { Dispatch, SetStateAction, MouseEvent } from "react";
import up from "../assets/up.svg";
import down from "../assets/down.svg";
import { SortAlgorithm } from "../utils/useTable";

type TableHeaderProps<T> = {
  title: string;
  hideOnMobile?: boolean;
  sortAlgorithm: SortAlgorithm<T>;
  setSortAlgorithm: Dispatch<SetStateAction<SortAlgorithm<T>>>;
  headerAttribute: keyof T;
}

const TableHeader = <T,>({ title, hideOnMobile, sortAlgorithm, setSortAlgorithm, headerAttribute }: TableHeaderProps<T>) => {
  const isNormalSorted = sortAlgorithm.attribute === headerAttribute && !sortAlgorithm.isReversed;
  const isReverseSorted =  sortAlgorithm.attribute === headerAttribute && sortAlgorithm.isReversed;

  const handleOnClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (isNormalSorted) {
      setSortAlgorithm({ attribute: sortAlgorithm.attribute, isReversed: true });
    }
    else if (isReverseSorted) {
      setSortAlgorithm({ attribute: null, isReversed: false });
    }
    else {
      setSortAlgorithm({ attribute: headerAttribute, isReversed: false });
    }
  }

  return (
    <th className={`relative hover:cursor-pointer select-none p-2 ${hideOnMobile ? "hidden lg:table-cell" : ""}`} onClick={handleOnClick}>
      <span className="mr-6">{ title }</span>
      <span className="inline-flex flex-col absolute right-4 top-1/2 -translate-y-1/2">
        <img className={`w-3 scale-125 ${isNormalSorted ? "opacity-100" : "opacity-50 "}`} src={up} alt="up icon" />
        <img className={`w-3 scale-125 ${isReverseSorted ? "opacity-100" : "opacity-50 "}`} src={down} alt="down icon" />
      </span>
    </th>
  );
}

export default TableHeader;