import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import isomorphicFetch from "isomorphic-fetch";
import { useEffect } from "react";
import { setContext } from "@apollo/client/link/context";

let clientSingleton;
let _token;

const isServer = typeof window === "undefined";

export interface UseApolloHookPropsInterface {
  token?: string;
  host: string;
}

export function useApollo(
  props: UseApolloHookPropsInterface
): ApolloClient<InMemoryCache> {
  const { token, host } = props;

  useEffect(() => {
    _token = token;
  }, []);

  useEffect(() => {
    _token = token;
  }, [token]);

  if (!clientSingleton) {
    const httpLink = split(
      (operation) => operation.getContext().service === "platform",
      createHttpLink({
        uri: host,
        fetch: isomorphicFetch,
      }),
      createHttpLink({
        uri: host,
        fetch: isomorphicFetch,
      })
    );

    const authLink = setContext((_, { headers }) => {
      console.log("auth link");
      return {
        headers: {
          ...headers,
          ...(_token
            ? {
                "roq-platform-authorization":
                  `Bearer ` + _token.replace("Bearer ", " ").trim(),
              }
            : {}),
        },
      };
    });

    clientSingleton = new ApolloClient({
      ssrMode: isServer,
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }

  return clientSingleton;
}
