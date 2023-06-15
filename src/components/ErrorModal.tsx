import { FallbackProps } from "react-error-boundary/dist/declarations/src";
import MainPage from "./MainPage";

const ErrorModal = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div onClick={resetErrorBoundary}>
      <div className="fixed top-0 flex justify-center z-50 w-full">
        <h2 className="text-red-500 bg-red-100 border-red-500 border rounded-md p-4 mt-16">Cannot Edit In Demo Mode</h2>
      </div>

      <MainPage />
    </div>
  );
}

export default ErrorModal;