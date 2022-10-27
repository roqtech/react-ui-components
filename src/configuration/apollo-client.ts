import { ApolloClient, createHttpLink, from, InMemoryCache, Observable, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { config } from 'src/utils/config';

let clientSingleton;

export function apolloClient(): ApolloClient<InMemoryCache> {
  if (!clientSingleton) {
    const httpLink = split(
      (operation) => operation.getContext().service === 'platform',
      createHttpLink({
        uri: config.platform.gql,
      }),
    );

    const authLink = setContext((_, { headers, service }) => {
      // const { auth } = store.getState();
      // const timezone = auth?.user?.timezone ?? publicConfig.timezone.default;
      // const locale = auth?.user?.locale ?? Router.locale;
      // const accessToken = auth?.accessToken ?? null;

      return {
        headers: {
          ...headers,
          // locale,
          // timezone,
          // ...auth.platformAccessToken && {
          //   [publicConfig.platform.authorizationHeader]: 'Bearer ' + auth.platformAccessToken,
          // },
          // ...(service === 'platform'
          //   ? {
          //       [publicConfig.platform.requestIdHeader]: uuidv4()
          //     }
          //   : {
          //       authorization: accessToken ? `Bearer ${accessToken}` : '',
          //     }),
        },
      };
    });

    // const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    //   if (graphQLErrors) {
    //     for (const err of graphQLErrors) {
    //       switch (err.extensions?.exception?.status) {
    //         case 401: {
    //           // next-auth should check if access token is expired and refresh it (see jwt callback)
    //           return new Observable((observer) => {
    //             getSession()
    //               .then((session) => {
    //                 const accessToken = session.accessToken as string;
    //                 const platformAccessToken = session.platformAccessToken as string;
    //                 store.dispatch(refreshAccessTokenAction({ accessToken }));

    //                 operation.setContext(({ headers = {}, service }) => ({
    //                   headers: {
    //                     ...headers,
    //                     locale: Router.locale,
    //                     ...(service === 'platform'
    //                       ? { [publicConfig.platform.authorizationHeader]: platformAccessToken }
    //                       : { authorization: accessToken ? `Bearer ${accessToken}` : '' }),
    //                   },
    //                 }));
    //               })
    //               .then(() => {
    //                 const subscriber = {
    //                   next: observer.next.bind(observer),
    //                   error: observer.error.bind(observer),
    //                   complete: observer.complete.bind(observer),
    //                 };

    //                 // Retry last failed request
    //                 forward(operation).subscribe(subscriber);
    //               })
    //               .catch((error) => {
    //                 // No refresh or client token available, we force user to login
    //                 observer.error(error);
    //                 store.dispatch(logoutOnExpiredAction());
    //                 void Router.push('/login');
    //               });
    //           });
    //         }
    //       }
    //     }
    //   }
    // });

    clientSingleton = new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }

  return clientSingleton;
}
