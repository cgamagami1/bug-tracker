import { useState, useEffect } from "react";

const useMediaQuery = (query: string, callback: (matches: boolean) => void) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const handleOnResize = () => {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      callback(media.matches);
    };

    window.addEventListener("resize", handleOnResize);
    return () => window.removeEventListener("resize", handleOnResize);
  }, [query]);

  return matches;
}

export default useMediaQuery;