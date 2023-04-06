import { ReactNode } from "react";
import { Link } from "react-router-dom";

type DetailsCardProps = {
  title: string;
  children: ReactNode;
}

const DetailsCard = ({ title, children }: DetailsCardProps) => {
  return (
    <div className="bg-white rounded-md px-6 py-2 flex-grow text-sm self-stretch xl:w-96">
      <div className="flex justify-between items-center">
        <h3 className="text-lg p-2">{ title }</h3>
        <Link to="./edit" relative="path" className="border border-purple-700 text-purple-700 rounded-md py-1 px-2 hover:cursor-pointer hover:bg-purple-100 m-2">Edit</Link>
      </div>

      <div className="text-left border-t border-gray-400 w-full grid grid-cols-2">
        { children }
      </div>
    </div>
  );
}

export default DetailsCard;