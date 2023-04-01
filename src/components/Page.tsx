import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="bg-gray-100 flex-grow p-4 lg:p-8 text-gray-700">
      { children }
    </div>
  );
}

export default Page;