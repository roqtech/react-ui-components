import React, { useCallback, useEffect, useMemo } from "react";

type ControlScrollRef = (node: IntersectionObserverCallback) => void;

export interface UseScrollControlProps {
  updateFlag?: unknown;
  onBottomVisible: (scroll: unknown) => void;
  /**
   * The distance in pixels
   */
  thresholdBottom?: number;
}

export interface UseScrollControl {
  elementRef: ControlScrollRef;
  onScroll: () => void;
}

export const useScrollControl = (
  props: UseScrollControlProps
): UseScrollControl => {
  const { updateFlag, onBottomVisible, thresholdBottom = 120 } = props;

  const scrollableRootRef = React.useRef<HTMLDivElement | null>();
  const lastScrollDistanceToBottomRef = React.useRef<number>();

  const elementRef = React.useCallback((node: HTMLDivElement) => {
    scrollableRootRef.current = node;
    scrollableRootRef.scrollTop = scrollableRootRef.scrollHeight;
  }, []);

  const scrollDown = useCallback(() => {
    lastScrollDistanceToBottomRef.current = 0;
  }, []);

  const scroll = useMemo(() => {
    scrollDown;
  }, [scrollDown]);

  useEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;

    if (scrollableRoot) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }

    if (lastScrollDistanceToBottom <= thresholdBottom) {
      scrollDown();
      onBottomVisible(scroll);
    }
  }, [updateFlag]);

  const onScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
      console.log("onScroll", scrollDistanceToBottom);
    }
  }, []);

  return {
    elementRef,
    onScroll,
  };
};
