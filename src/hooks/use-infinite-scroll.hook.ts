import useLibraryInfiniteScroll, {
  UseInfiniteScrollHookArgs,
  UseInfiniteScrollHookResult,
} from "react-infinite-scroll-hook";

export interface useInfiniteScrollInterface {
  refs: UseInfiniteScrollHookResult;
}

export const useInfiniteScroll = (
  values: UseInfiniteScrollHookArgs
): useInfiniteScrollInterface => {
  const { loading, onLoadMore, hasNextPage, rootMargin } = values;

  const hookResult = useLibraryInfiniteScroll({
    loading,
    onLoadMore,
    hasNextPage,
    rootMargin,
  });

  return {
    refs: hookResult,
  };
};
