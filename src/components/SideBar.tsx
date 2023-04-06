import SideBarItem from "./SideBarItem";
import home from "/home.svg";
import archive from "/archive.svg";
import tag from "/tag.svg";
import users from "/users.svg";
import settings from "/settings.svg";

type SideBarProps = {
  isOpen: boolean;
  handleOnClick: () => void;
}

const SideBar = ({ isOpen, handleOnClick }: SideBarProps) => {
  return (
    <nav className={`h-full p-6 w-72 border shadow-md z-20 bg-white fixed ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <SideBarItem title="Dashboard" icon={home} url={"/"} handleOnClick={handleOnClick} />
      <SideBarItem title="My Projects" icon={archive} url={"/projects"} handleOnClick={handleOnClick} />
      <SideBarItem title="My Tickets" icon={tag} url={"/tickets"} handleOnClick={handleOnClick} />
      <SideBarItem title="Manage Users" icon={users} url={"/manage"} handleOnClick={handleOnClick} />
      <SideBarItem title="Settings" icon={settings} url={"/settings"} handleOnClick={handleOnClick} />
    </nav>
  );
}

export default SideBar;