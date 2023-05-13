import SideBarItem from "./SideBarItem";
import home from "/home.svg";
import archive from "/archive.svg";
import tag from "/tag.svg";
import settings from "/settings.svg";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

type SideBarProps = {
  isOpen: boolean;
  handleOnClick: () => void;
}

const SideBar = ({ isOpen, handleOnClick }: SideBarProps) => {
  const { userData } = useContext(UserContext);

  return (
    <nav className={`h-full p-6 w-72 border shadow-md z-20 bg-white fixed ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <img src={userData.profilePicture} alt="profile picture" className="w-32 h-32 m-auto object-cover rounded-[50%]" />
      <h1 className="text-center text-xl border-gray-300 border-b py-3">{`${userData.firstName} ${userData.lastName}`}</h1>
      
      <SideBarItem title="Dashboard" icon={home} url={"/"} handleOnClick={handleOnClick} />
      <SideBarItem title="My Projects" icon={archive} url={"/projects"} handleOnClick={handleOnClick} />
      <SideBarItem title="My Tickets" icon={tag} url={"/tickets"} handleOnClick={handleOnClick} />
      <SideBarItem title="Settings" icon={settings} url={"/settings"} handleOnClick={handleOnClick} />
    </nav>
  );
}

export default SideBar;