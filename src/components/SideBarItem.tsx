import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

type SideBarItemProps = {
  title: string;
  icon: string;
  url: string;
}

const SideBarItem: FC<SideBarItemProps> = ({ title, icon, url}) => {
  const { pathname } = useLocation();

  return (
    <Link to={url} className="flex items-center p-4 relative hover:cursor-pointer">
      {url === pathname && <span className="h-8 w-1 bg-black absolute left-0"></span>}
      <img className="mr-2 w-5" src={icon} alt={`${title} Icon`} />
      <span className="text-sm">{ title }</span>
    </Link>
  );
}

export default SideBarItem;