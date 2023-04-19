import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import useMediaQuery from "../utils/useMediaQuery";
import { TeamMemberProvider } from "../context/TeamMemberContext";
import { ProjectProvider } from "../context/ProjectContext";
import { UserContext } from "../context/UserContext";
import { TicketProvider } from "../context/TicketContext";

const MainPage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1536px)', (isDesktop) => setIsSideBarOpen(isDesktop));
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (user === null) {
    navigate("/signin");
  }

  const handleOnCloseSideBar = () => {
    if (!isDesktop) {
      setIsSideBarOpen(false);
    }
  }

  return (
    <ProjectProvider>
      <TeamMemberProvider>
        <TicketProvider>
          <div className="h-screen flex flex-col">
            <HeaderBar handleOnMenuClick={() => setIsSideBarOpen(isbo => !isbo)} />
            <div className="flex flex-grow">
              <SideBar isOpen={isSideBarOpen} handleOnClick={handleOnCloseSideBar} />
              <div className={`flex-grow bg-gray-100 p-4 lg:p-8 text-gray-700 ${isSideBarOpen ? "2xl:ml-72" : ""}`} onClick={handleOnCloseSideBar}>
                <Outlet />
              </div>
            </div>
          </div>
        </TicketProvider>
      </TeamMemberProvider>
    </ProjectProvider>
  );
}

export default MainPage;