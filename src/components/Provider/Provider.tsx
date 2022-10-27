import React, { createContext, useContext } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { config } from 'src/utils/config';

type Optional<T> = T | null
export interface IRoqProvider {
  host: string
  token: string
}

const defaultCtx = {
  host: config.platform.gql,
  token: ''
};

const ROQContext = createContext(defaultCtx);

const queryClient = new QueryClient();

export const RoqProvider = ({ children, config = defaultCtx, withQueryClient = true }: { children: JSX.Element, config: Partial<IRoqProvider>, withQueryClient?: boolean}) => {
  if (withQueryClient) {
    return (
      <ROQContext.Provider value={{...defaultCtx, ...config}}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </ROQContext.Provider>
    )
  }
  return (
    <ROQContext.Provider value={{...defaultCtx, ...config}}>{children}</ROQContext.Provider>
  )
};

export const useRoq = () => useContext(ROQContext);
export function useResolveProvider(args?: Partial<IRoqProvider>) {
  const { host: hostArg, token: tokenArg } = args || {}
  const { host: hostProvide, token: tokenProvider } = useRoq()
  const host = hostArg ?? hostProvide
  const token = tokenArg ?? tokenProvider
  return { host, token }
}
