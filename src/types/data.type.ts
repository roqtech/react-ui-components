import { ComplexError } from "src/types";

export interface InfiniteListInterface<T> {
  error: ComplexError | null;
  isLoading: boolean;
  hasMore: boolean;
  offset: number;
  limit: number;
  totalCount: number;
  loadedTotal: number;
  data: T[];
}
