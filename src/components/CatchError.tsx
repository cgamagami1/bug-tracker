import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorModal from "./ErrorModal";

type CatchErrorProps = {
  children: ReactNode;
}

const CatchError = ({ children }: CatchErrorProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorModal}
    >
      { children }
    </ErrorBoundary>
  );
}

export default CatchError;