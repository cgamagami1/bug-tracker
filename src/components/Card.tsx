import { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
}

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="bg-white rounded-md px-6 py-2 flex-grow text-sm text-left gap-4">
      <h3 className="text-xl p-2 border-b border-gray-400">{ title }</h3>
      { children }
    </div>
  );
}

export default Card;