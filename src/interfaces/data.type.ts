import { ComplexError } from "src/interfaces";

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
