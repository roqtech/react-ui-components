import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache, split } from '@apollo/client';
import isomorphicFetch from 'isomorphic-fetch'
import { config } from 'src/utils/config';
import { useRoq } from 'src/components/Provider';

let clientSingleton;
const isServer = typeof window === 'undefined'

const authLink = (token?: string) => new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({ headers: {
    ...headers,
    ...(token ? { 'roq-platform-authorization': token } : {}),
  }}));

  return forward(operation)
})

export function useApollo(): ApolloClient<InMemoryCache> {
  const { token } = useRoq()
  if (!clientSingleton) {
    const httpLink = split(
      (operation) => operation.getContext().service === 'platform',
      createHttpLink({
        uri: `${config.platform.graphqlUri}`,
        fetch: isomorphicFetch
      }),
      createHttpLink({
        uri: `${config.backend.graphqlUri}`,
        fetch: isomorphicFetch
      }),
    );

    clientSingleton = new ApolloClient({
      ssrMode: isServer,
      link: from([authLink(token), httpLink]),
      cache: new InMemoryCache(),
    });
  }

  return clientSingleton;
}
