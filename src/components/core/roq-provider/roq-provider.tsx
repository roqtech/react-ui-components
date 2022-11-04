import React, { createContext, useContext, ReactNode, useMemo } from "react";
import get from "lodash/get";
import { config } from "src/utils/config";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/hooks/use-apollo";
import { TranslationFunction } from "src/interfaces";

const messages = require("src/locales/en/common.json");

export interface RoqProviderContextInterface {
  host: string;
  token?: string;
  userToken?: string;
  user?: {
    id: string;
    roqIdentifier: string;
  };
  t: TranslationFunction;
  mutate: () => unknown;
  query: () => unknown;
}

export interface RoqProviderPropsInterface {
  children: ReactNode;
  config: Partial<RoqProviderContextInterface>;
  t?: TranslationFunction;
}

const defaultCtx: RoqProviderContextInterface = {
  host: config.platform.graphqlUri,
  t: (key: string) => {
    console.error(
      "Error: RoqProvider doesn`t configured! Please check the documentation"
    );

    return key;
  },

  mutate: () => {
    throw Error(
      "Error: RoqProvider doesn`t configured! Please check the documentation"
    );
  },
  query: () => {
    throw Error(
      "Error: RoqProvider doesn`t configured! Please check the documentation"
    );
  },
};

export const ROQContext =
  createContext<RoqProviderContextInterface>(defaultCtx);

export const defaultTranslationFunction: TranslationFunction = (
  key: string,
  defaultValue?: string
) => {
  return get(messages, key, defaultValue);
};

export const RoqProvider = (props: RoqProviderPropsInterface) => {
  const { children, config, t = defaultTranslationFunction } = props;

  const mutate = () => {};

  const query = () => {};

  const state = useMemo<RoqProviderContextInterface>(
    () => ({
      ...defaultCtx,
      ...config,
      t,
      mutate,
      query,
    }),
    [config, t, mutate, query]
  );

  return (
    <ROQContext.Provider value={state}>
      <ApolloWrapper>{children}</ApolloWrapper>
    </ROQContext.Provider>
  );
};

const ApolloWrapper = ({ children }) => {
  const client = useApollo();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const useRoqContext = () =>
  useContext<RoqProviderContextInterface>(ROQContext);

export const useRoqComponents = useRoqContext;

export function useResolveProvider(
  args?: Partial<RoqProviderContextInterface>
) {
  const { host: hostArg, token: tokenArg } = args || {};
  const { host: hostProvide, token: tokenProvider } = useRoqComponents();
  const host = hostArg ?? hostProvide;
  const token = tokenArg ?? tokenProvider;
  return { host, token };
}
