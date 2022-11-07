import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import get from "lodash/get";
import { config } from "src/utils/config";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/hooks/use-apollo";
import { LocaleTranslationFunctionInterface } from "src/interfaces";
import {
  PLATFORM_INTERNAL_POSTFIX,
  PLATFORM_CONSOLE_POSTFIX,
  PLATFORM_CLIENT_SIDE_POSTFIX,
  PLATFORM_SERVER_SIDE_POSTFIX,
  TIMEZONES,
} from "src/constants";
import { hostname } from "os";

const enMessages = require("src/locales/en/common.json");
const deMessages = require("src/locales/de/common.json");

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
  t: LocaleTranslationFunctionInterface;
  mutate: () => unknown;
  query: () => unknown;
  locale?: string;
  locales?: string[];
  languages: unknown[];
  onLocaleChange: (locale: string) => void;
  timezone?: string;
  timezones?: string[];
  onTimezoneChange: (timezone: string) => void;
}

export interface RoqProviderPropsInterface {
  children: ReactNode;
  config: RoqProviderConfigInterface;
  t?: LocaleTranslationFunctionInterface;
  locale?: string;
  locales?: string[];
  onLocaleChange: (locale: string) => void;
  timezone?: string;
  timezones?: string[];
  onTimezoneChange: (timezone: string) => void;
  languages: unknown[];
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
    | "languages"
  > {}

export const ROQContext =
  createContext<RoqProviderContextInterface>(defaultCtx);

export const defaultTranslationFunction = (
  messages,
  key: string,
  defaultValue?: string
) => {
  return get(messages, key, defaultValue ?? key);
};

export const RoqProvider = (props: RoqProviderPropsInterface) => {
  const [_locale, _setLocale] = useState(props.locale);
  const [_timezone, _setTimezone] = useState(props.timezone);

  const {
    children,
    config,
    t,
    locale = "en-US",
    locales = ["en-US", "de-DE"],
    languages,
    onLocaleChange,
    timezone,
    timezones = TIMEZONES,
    onTimezoneChange,
  } = props;

  const messages = useMemo(
    () => (_locale === "en-US" ? enMessages : deMessages),
    [_locale]
  );

  const translate = useCallback(
    (key: string, defaultValue?: string) =>
      defaultTranslationFunction(messages, key, defaultValue),
    [messages]
  );

  const defaultLanguages = useMemo(
    () => [
      {
        value: "en-US",
        label: translate(`languages.full_en-US`),
      },
      {
        value: "de-DE",
        label: translate(`languages.full_de-DE`),
      },
    ],
    [translate]
  );

  const setLocale = useCallback(
    (locale) => {
      _setLocale(locale);
      onLocaleChange?.(locale);
    },
    [_setLocale, onLocaleChange]
  );

  const setTimezone = useCallback(
    (timezone) => {
      _setTimezone(timezone);
      onLocaleChange?.(timezone);
    },
    [_setTimezone, onTimezoneChange]
  );

  useEffect(
    function handleLocaleChanged() {
      _setLocale(locale);
    },
    [locale]
  );

  useEffect(
    function handleTimezoneChanged() {
      _setTimezone(timezone);
    },
    [timezone]
  );

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
      t: t ?? translate,
      locale: _locale,
      locales,
      onLocaleChange: setLocale,
      timezone: _timezone,
      timezones,
      languages: languages ?? defaultLanguages,
      onTimezoneChange: setTimezone,
      mutate,
      query,
    }),
    [
      config,
      platformUrls,
      t,
      _locale,
      locales,
      setLocale,
      _timezone,
      timezones,
      setTimezone,
      mutate,
      query,
      translate,
      languages,
      defaultLanguages,
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
