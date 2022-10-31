import React, { createContext, useContext } from "react";
import { config } from 'src/utils/config';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from 'src/hooks/use-apollo';

type Optional<T> = T | null
export interface IRoqProvider {
  host: string
  token: string
}

const defaultCtx = {
  host: config.platform.graphqlUri,
};

export const ROQContext = createContext(defaultCtx);
export const useRoq = () => useContext(ROQContext) as IRoqProvider;

export const RoqProvider = ({ children, config = defaultCtx as IRoqProvider }: { children: JSX.Element, config: IRoqProvider}) => {
  return (
    <ROQContext.Provider value={{...defaultCtx, ...config}}>
      <ApolloWrapper>
        {children}
      </ApolloWrapper>
    </ROQContext.Provider>
  )
};

const ApolloWrapper = ({ children }) => {
  const client = useApollo() 
  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}

export function useResolveProvider(args?: Partial<IRoqProvider>) {
  const { host: hostArg, token: tokenArg } = args || {}
  const { host: hostProvide, token: tokenProvider } = useRoq()
  const host = hostArg ?? hostProvide
  const token = tokenArg ?? tokenProvider
  return { host, token }
}
