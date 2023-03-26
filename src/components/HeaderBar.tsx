import { FC } from "react";
import bell from "../assets/bell.svg";
import menu from "../assets/menu.svg";

type HeaderBarProps = {
  handleOnMenuClick: () => void;
}

const HeaderBar: FC<HeaderBarProps> = ({ handleOnMenuClick }) => {
  return (
    <div className="p-4 shadow-md flex justify-between z-10">
      <img className="w-6 hover:cursor-pointer" src={menu} alt="menu icon" onClick={handleOnMenuClick} />
      <img className="w-6 hover:cursor-pointer" src={bell} alt="notification icon" />
    </div>
  );
}

export default HeaderBar;