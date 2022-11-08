import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import isomorphicFetch from "isomorphic-fetch";
import { config } from "src/utils/config";
import { useRoqComponents } from "src/components/core/roq-provider";
import { useCallback, useEffect, useRef } from "react";
import { setContext } from "@apollo/client/link/context";

let clientSingleton;
const isServer = typeof window === "undefined";

export function useApollo(): ApolloClient<InMemoryCache> {
  const { token: platformToken, platformClientSide: platfromUrl } =
    useRoqComponents();

  const uri = useRef(platfromUrl);
  const token = useRef(platformToken);

  useEffect(() => {
    token.current = platformToken;
  }, [platformToken]);

  useEffect(() => {
    uri.current = platfromUrl;
  }, [platfromUrl]);

  if (!clientSingleton) {
    const httpLink = split(
      (operation) => operation.getContext().service === "platform",
      createHttpLink({
        uri: uri?.current,
        fetch: isomorphicFetch,
      }),
      createHttpLink({
        uri: uri?.current,
        fetch: isomorphicFetch,
      })
    );

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          ...(token?.current
            ? { "roq-platform-authorization": `Bearer` + ' ' +token?.current }
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
