import { Dispatch, SetStateAction, MouseEvent } from "react";
import up from "../assets/up.svg";
import down from "../assets/down.svg";
import { SortAlgorithm } from "../pages/MyProjects/ProjectsTable";

type TableHeaderProps<T> = {
  title: string;
  className?: string;
  sortAlgorithm: SortAlgorithm<T>;
  setSortAlgorithm: Dispatch<SetStateAction<SortAlgorithm<T>>>;
  headerAttribute: keyof T;
}

const TableHeader = <T,>({ title, className, sortAlgorithm, setSortAlgorithm, headerAttribute }: TableHeaderProps<T>) => {
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
    <th className={`p-4 relative hover:cursor-pointer select-none ${className}`} onClick={handleOnClick}>
      <span className="mr-6">{ title }</span>
      <span className="inline-flex flex-col absolute right-4">
        <img className={`w-3 ${isNormalSorted ? "scale-150" : ""}`} src={up} alt="up icon" />
        <img className={`w-3 ${isReverseSorted ? "scale-150" : ""}`} src={down} alt="down icon" />
      </span>
    </th>
  );
}

export default TableHeader;