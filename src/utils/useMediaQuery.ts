import { useState, useEffect } from "react";

const useMediaQuery = (query: string, callback: (matches: boolean) => void) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const handleOnResize = () => {
      setMatches(window.matchMedia(query).matches);
      callback(window.matchMedia(query).matches);
    };

    handleOnResize();
    
    window.addEventListener("resize", handleOnResize);
    return () => window.removeEventListener("resize", handleOnResize);
  }, [query]);

  return matches;
}

export default useMediaQuery;