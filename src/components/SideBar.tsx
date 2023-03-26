import { FC } from "react";
import SideBarItem from "./SideBarItem";
import home from "/home.svg";
import archive from "/archive.svg";
import tag from "/tag.svg";
import users from "/users.svg";
import settings from "/settings.svg";

type SideBarProps = {
  isOpen: boolean;
}

const SideBar: FC<SideBarProps> = ({ isOpen }) => {
  return (
    <nav className={`h-full p-6 w-72 border shadow-md z-20 bg-white fixed ${isOpen ? "md:static translate-x-0" : "-translate-x-full"}`}>
      <SideBarItem title="Dashboard" icon={home} url={"/"} />
      <SideBarItem title="My Projects" icon={archive} url={"/projects"} />
      <SideBarItem title="My Tickets" icon={tag} url={"/tickets"} />
      <SideBarItem title="Manage Users" icon={users} url={"/manage"} />
      <SideBarItem title="Settings" icon={settings} url={"/settings"} />
    </nav>
  );
}

export default SideBar;