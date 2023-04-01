import { Link, Routes, Route } from "react-router-dom";

type SideBarItemProps = {
  title: string;
  icon: string;
  url: string;
  handleOnClick: () => void;
}

const SideBarItem = ({ title, icon, url, handleOnClick}: SideBarItemProps) => {
  return (
    <Link to={url} className="flex items-center p-4 relative hover:cursor-pointer" onClick={handleOnClick}>
      <Routes>
        <Route path={`${url}/*`} element={<span className="h-8 w-1 bg-black absolute left-0"></span>} />
      </Routes>
      <img className="mr-2 w-5" src={icon} alt={`${title} Icon`} />
      <span className="text-sm">{ title }</span>
    </Link>
  );
}

export default SideBarItem;