import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import useMediaQuery from "../utils/useMediaQuery";

const MainPage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1536px)', (isDesktop) => setIsSideBarOpen(isDesktop));

  const handleOnSideBarClick = () => {
    if (!isDesktop) {
      setIsSideBarOpen(false);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <HeaderBar handleOnMenuClick={() => setIsSideBarOpen(isbo => !isbo)} />
      <div className="flex flex-grow">
        <SideBar isOpen={isSideBarOpen} handleOnClick={handleOnSideBarClick} />
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;