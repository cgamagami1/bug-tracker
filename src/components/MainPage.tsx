import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import useMediaQuery from "../utils/useMediaQuery";
import { ProjectProvider } from "../context/ProjectContext";
import { UserContext } from "../context/UserContext";
import { TicketProvider } from "../context/TicketContext";
import Loading from "./Loading";

const MainPage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1536px)', (isDesktop) => setIsSideBarOpen(isDesktop));
  const { user, isUserLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnCloseSideBar = () => {
    if (!isDesktop) {
      setIsSideBarOpen(false);
    }
  }

  if (isUserLoading) return (
    <Loading />
  );

  if (user === null) {
    navigate("/signin");
  }

  return (
    <ProjectProvider>
      <TicketProvider>
        <div className="h-screen flex flex-col">
          <HeaderBar handleOnMenuClick={() => setIsSideBarOpen(isbo => !isbo)} handleOnInboxClick={() => setIsInboxOpen(true)} isInboxOpen={isInboxOpen} />
          <div className="flex flex-grow" onClick={() => setIsInboxOpen(false)}>
            <SideBar isOpen={isSideBarOpen} handleOnClick={handleOnCloseSideBar} />
            <div className={`flex-grow bg-gray-100 p-4 lg:p-8 text-gray-700 ${isSideBarOpen ? "2xl:ml-72" : ""}`} onClick={handleOnCloseSideBar}>
              <Outlet />
            </div>
          </div>
        </div>
      </TicketProvider>
    </ProjectProvider>
  );
}

export default MainPage;