import React, { createContext, useContext, ReactNode, useMemo } from "react";
import get from "lodash/get";
import { config } from "src/utils/config";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/hooks/use-apollo";
import { TranslationFunctionInterface } from "src/interfaces";
import {
  PLATFORM_INTERNAL_POSTFIX,
  PLATFORM_CONSOLE_POSTFIX,
  PLATFORM_CLIENT_SIDE_POSTFIX,
  PLATFORM_SERVER_SIDE_POSTFIX,
  TIMEZONES,
} from "src/constants";
import { hostname } from "os";

const messages = require("src/locales/en/common.json");

const PLATFORM_GRAPHS = [
  PLATFORM_INTERNAL_POSTFIX,
  PLATFORM_CONSOLE_POSTFIX,
  PLATFORM_CLIENT_SIDE_POSTFIX,
  PLATFORM_SERVER_SIDE_POSTFIX,
];

export interface RoqProviderConfigInterface {
  host: string;
  token?: string;
}

export interface RoqProviderContextInterface
  extends RoqProviderConfigInterface {
  platformInternal: string;
  platformConsole: string;
  platformClientSide: string;
  platformServerSide: string;
  userToken?: string;
  user?: {
    id: string;
    roqIdentifier: string;
  };
  t: TranslationFunctionInterface;
  mutate: () => unknown;
  query: () => unknown;
  locale?: string;
  locales?: string[];
  onLocaleChange: (locale: string) => void;
  timezone?: string;
  timezones?: string[];
  onTimezoneChange: (timezone: string) => void;
}

export interface RoqProviderPropsInterface {
  children: ReactNode;
  config: RoqProviderConfigInterface;
  t?: TranslationFunctionInterface;
  locale?: string;
  locales?: string[];
  onLocaleChange: (locale: string) => void;
  timezone?: string;
  timezones?: string[];
  onTimezoneChange: (timezone: string) => void;
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

export interface RoqProviderLocaleContextInterface
  extends Pick<
    RoqProviderContextInterface,
    | "locale"
    | "locales"
    | "onLocaleChange"
    | "timezone"
    | "timezones"
    | "onTimezoneChange"
  > {}

export const ROQContext =
  createContext<RoqProviderContextInterface>(defaultCtx);

export const defaultTranslationFunction: TranslationFunctionInterface = (
  key: string,
  defaultValue?: string
) => {
  return get(messages, key, defaultValue);
};

export const RoqProvider = (props: RoqProviderPropsInterface) => {
  const {
    children,
    config,
    t = defaultTranslationFunction,
    locale = "en",
    locales = ["en"],
    onLocaleChange,
    timezone,
    timezones = TIMEZONES,
    onTimezoneChange,
  } = props;

  const mutate = () => {};

  const query = () => {};

  const platformUrls = useMemo<
    Pick<
      RoqProviderContextInterface,
      | "platformInternal"
      | "platformConsole"
      | "platformClientSide"
      | "platformServerSide"
    >
  >(
    () => ({
      platformInternal: `${config?.host}/${PLATFORM_INTERNAL_POSTFIX}`,
      platformConsole: `${config?.host}/${PLATFORM_CONSOLE_POSTFIX}`,
      platformClientSide: `${config?.host}/${PLATFORM_CLIENT_SIDE_POSTFIX}`,
      platformServerSide: `${config?.host}/${PLATFORM_SERVER_SIDE_POSTFIX}`,
    }),
    [config?.host]
  );

  const state = useMemo<RoqProviderContextInterface>(
    () => ({
      ...defaultCtx,
      ...config,
      ...platformUrls,
      t,
      locale,
      locales,
      onLocaleChange,
      timezone,
      timezones,
      onTimezoneChange,
      mutate,
      query,
    }),
    [
      config,
      platformUrls,
      t,
      locale,
      locales,
      onLocaleChange,
      timezone,
      timezones,
      onTimezoneChange,
      mutate,
      query,
    ]
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
