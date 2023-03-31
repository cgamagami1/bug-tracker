import bell from "../assets/bell.svg";
import menu from "../assets/menu.svg";

type HeaderBarProps = {
  handleOnMenuClick: () => void;
}

const HeaderBar = ({ handleOnMenuClick }: HeaderBarProps) => {
  return (
    <div className="p-4 shadow-md flex justify-between z-10 sticky top-0 bg-white">
      <img className="w-6 hover:cursor-pointer" src={menu} alt="menu icon" onClick={handleOnMenuClick} />
      <img className="w-6 hover:cursor-pointer" src={bell} alt="notification icon" />
    </div>
  );
}

export default HeaderBar;