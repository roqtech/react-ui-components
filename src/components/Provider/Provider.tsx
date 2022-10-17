import React, { createContext, useContext } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { PLATFORM_GRAPHQL_HOST } from 'src/utils/constant';

type Optional<T> = T | null
export interface IRoqProvider {
  host: string
  token: string
}

const defaultCtx = {
  host: PLATFORM_GRAPHQL_HOST,
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
