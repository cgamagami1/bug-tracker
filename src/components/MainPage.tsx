import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import useMediaQuery from "../utils/useMediaQuery";
import { UserContext } from "../context/UserContext";
import Loading from "./Loading";
import CatchError from "./CatchError";

const MainPage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1536px)', (isDesktop) => setIsSideBarOpen(isDesktop));
  const { user, isUserLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnCloseSideBar = () => {
    if (!isDesktop) {
      setIsSideBarOpen(false);
    }
  }

  const handleOnCloseMenus = () => {
    setIsInboxOpen(false);
    setIsSearchBoxOpen(false);
  }

  const handleOnOpenInbox = () => {
    handleOnCloseMenus();
    setIsInboxOpen(true);
  }

  const handleOnOpenSearchBox = () => {
    handleOnCloseMenus();
    setIsSearchBoxOpen(true);
  }

  if (isUserLoading) return (
    <Loading />
  );

  if (user === null) {
    navigate("/signin");
  }

  return (
    <CatchError>
      <div className="h-screen flex flex-col">
        <HeaderBar 
          handleOnMenuClick={() => setIsSideBarOpen(isbo => !isbo)} 
          handleOnInboxClick={handleOnOpenInbox} 
          isInboxOpen={isInboxOpen}
          handleOnSearchBoxClick={handleOnOpenSearchBox}
          isSearchBoxOpen={isSearchBoxOpen} 
        />
        <div className="flex flex-grow" onClick={handleOnCloseMenus}>
          <SideBar isOpen={isSideBarOpen} handleOnClick={handleOnCloseSideBar} />
          <div 
            className={`flex-grow bg-gray-100 p-4 lg:p-8 text-gray-700 ${isSideBarOpen ? "2xl:ml-72" : ""}`} 
            onClick={handleOnCloseSideBar}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </CatchError>
  );
}

export default MainPage;