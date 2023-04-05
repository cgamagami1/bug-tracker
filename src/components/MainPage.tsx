import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import useMediaQuery from "../utils/useMediaQuery";

const MainPage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1536px)', (isDesktop) => setIsSideBarOpen(isDesktop));

  const handleOnCloseSideBar = () => {
    if (!isDesktop) {
      setIsSideBarOpen(false);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <HeaderBar handleOnMenuClick={() => setIsSideBarOpen(isbo => !isbo)} />
      <div className="flex flex-grow">
        <SideBar isOpen={isSideBarOpen} handleOnClick={handleOnCloseSideBar} />
        <div className="flex-grow bg-gray-100 p-4 lg:p-8 text-gray-700" onClick={handleOnCloseSideBar}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainPage;