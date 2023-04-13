import { ButtonHTMLAttributes } from "react";
import loader from "../assets/loader.svg";

type ButtonProps = {
  title: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, isLoading, ...otherProps }: ButtonProps) => {
  return (
    <button className={`p-2 bg-purple-500 text-white rounded-md m-2 cursor-default ${isLoading ? "" : "hover:bg-purple-600 hover:cursor-pointer"}`} {...otherProps}>
      { isLoading ? <img className="m-auto animate-spin" src={loader} alt="Loading icon" /> : title }
    </button>
  );
}

export default Button;