import React, { createContext, useContext } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const baseUrl = 'https://roq-core-snapshot-gateway.roq-platform.com/v01'
type Optional<T> = T | null
interface ICtx {
  host: string
  token?: Optional<string>
}

const defaultCtx: ICtx = {
  host: `${baseUrl}/server/graphql`,
  token: null
};

const ROQContext = createContext(defaultCtx);

const queryClient = new QueryClient();

export const RoqProvider = ({ children, config = defaultCtx, withQueryClient = true }: { children: JSX.Element, config: Partial<ICtx>, withQueryClient?: boolean}) => {
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
