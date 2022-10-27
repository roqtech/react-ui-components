import {
  MouseEvent,
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
} from "react";

interface UseClickOutside<E> {
  containerRef: RefObject<E>;
}

export const useClickOutside = <E extends HTMLElement>(
  onClickOutside: (event: SyntheticEvent<HTMLElement, Event>) => void
): UseClickOutside<E> => {
  const containerRef = useRef<E>();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClickOutside(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return {
    containerRef,
  };
};
