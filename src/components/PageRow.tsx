import { ReactNode } from "react";

type PageRowProps = {
  children: ReactNode;
}

const PageRow = ({ children }: PageRowProps) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 justify-between items-stretch xl:items-start mb-8">
      { children }
    </div>
  );
}

export default PageRow;