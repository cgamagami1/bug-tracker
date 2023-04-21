import loader from "../assets/loader.svg";

export const BUTTON_STYLES = {
  PURPLE: {
    styles: "bg-purple-500 text-white w-40 h-9",
    hoverStyles: "hover:bg-purple-600",
  },
  GRAY: {
    styles: "bg-gray-200 w-40 h-9",
    hoverStyles: "hover:bg-gray-300",
  },
  AUTH: {
    styles: "bg-purple-500 text-white m-2 h-9",
    hoverStyles: "hover:bg-purple-600",
  },
  ADD_ITEM: {
    styles: "bg-purple-500 text-white py-1 px-2",
    hoverStyles: "hover:bg-purple-600",
  },
  RED: {
    styles: "bg-red-500 text-white w-40 h-9",
    hoverStyles: "hover:bg-red-600"
  }
}

type ButtonProps = {
  title: string;
  type?: "submit" | "button";
  style?: { 
    styles: string; 
    hoverStyles: string; 
  };
  isLoading?: boolean;
  handleOnClick?: () => void;
}

const Button = ({ title, type = "button", style = BUTTON_STYLES.PURPLE, isLoading, handleOnClick }: ButtonProps) => {
  return (
    <button className={`rounded-md cursor-default text-center ${style.styles} ${isLoading ? "" : `${style.hoverStyles} hover:cursor-pointer`}`} type={type} onClick={handleOnClick}>
      { isLoading ? <img className="m-auto animate-spin" src={loader} alt="Loading icon" /> : title }
    </button>
  );
}

export default Button;