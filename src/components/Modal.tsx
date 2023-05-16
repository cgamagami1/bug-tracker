import { FormEvent, ReactNode } from "react";

type ModalProps = {
  handleOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode
}

const Modal = ({ handleOnSubmit, children }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 grid justify-center items-center h-screen w-screen">
      <div className="fixed top-0 left-0 h-screen w-screen bg-gray-100 opacity-50"></div>
      <form onSubmit={handleOnSubmit} className="w-64 bg-white -translate-y-10 p-4 rounded-md shadow-md flex flex-col items-center gap-3">
        { children }
      </form>
    </div>
  );
}

export default Modal;