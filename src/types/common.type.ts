import { ApolloError } from "@apollo/client";

export interface PaginationInterface {
  limit?: number;
  offset?: number;
}

export type ComplexError = Error | ApolloError;
