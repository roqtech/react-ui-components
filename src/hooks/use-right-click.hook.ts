import { MouseEvent, RefObject, SyntheticEvent, useEffect, useRef } from "react";

interface UseRightClickHookInterface<E> {
  containerRef: RefObject<E>;
}

// eslint-disable-next-line @roq/no-invalid-hook-resource
export const isRightClick = (event: MouseEvent<Element>): boolean => event.buttons === 2

export const useRightClick = <E extends HTMLElement>(
  onRightClick: (event: SyntheticEvent<HTMLElement, Event>) => void
): UseRightClickHookInterface<E> => {
  const containerRef = useRef<E>();

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    }
  }, []);

  const handleContextMenu = (event) => {
    if (!containerRef.current || !containerRef.current.contains(event.target)) {
      return;
    }

    event.preventDefault();
    if (isRightClick(event)) {
      onRightClick(event);
    }
  }

  return { 
    containerRef
  };
};
