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
import {
  LocaleLanguageInterface,
  LocaleTranslationFunctionInterface,
} from "src/interfaces";
import {
  PLATFORM_CHAT_POSTFIX,
  PLATFORM_INTERNAL_POSTFIX,
  PLATFORM_CONSOLE_POSTFIX,
  PLATFORM_CLIENT_SIDE_POSTFIX,
  PLATFORM_SERVER_SIDE_POSTFIX,
  TIMEZONES,
} from "src/constants";
import { SocketProvider } from "src/components";

const enMessages = require("src/locales/en/common.json");
const deMessages = require("src/locales/de/common.json");

export interface RoqProviderConfigInterface {
  host: string;
  token?: string;
  getToken?: () => Promise<string>;
  tokenRefetchInternal?: number;
  locale?: string;
  locales?: string[];
  timezone?: string;
  timezones?: string[];
  languages?: LocaleLanguageInterface[];
  socket?: boolean;
}

export interface RoqProviderContextInterface {
  host: string;
  token?: string | null;
  platformInternal: string;
  platformConsole: string;
  platformClientSide: string;
  platformServerSide: string;
  platformChat: string;
  userToken?: string;
  user?: {
    id: string;
    roqIdentifier: string;
  };
  t: LocaleTranslationFunctionInterface;
  locale?: string;
  locales?: string[];
  languages: LocaleLanguageInterface[];
  onLocaleChange: (locale: string) => void;
  timezone?: string;
  timezones?: string[];
  onTimezoneChange: (timezone: string) => void;
}

export interface RoqProviderPropsInterface {
  children: ReactNode;
  config: RoqProviderConfigInterface;
  t?: LocaleTranslationFunctionInterface;
  onLocaleChange?: (locale: string) => void;
  onTimezoneChange?: (timezone: string) => void;
}

const defaultCtx = {
  host: config.platform.graphqlUri,
  t: (key: string) => {
    console.error(
      "Error: RoqProvider doesn`t configured! Please check the documentation"
    );

    return key;
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
  createContext<RoqProviderContextInterface>(defaultCtx as RoqProviderContextInterface);

export const defaultTranslationFunction = (
  messages,
  key: string,
  defaultValue?: string
) => {
  return get(messages, key, defaultValue ?? key);
};

export const RoqProvider = (props: RoqProviderPropsInterface) => {
  const [_token, _setToken] = useState(props?.config?.token);
  const [_tokenRefreshedAt, _setTokenRefreshedAt] = useState<number>(0);

  const [_locale, _setLocale] = useState(props?.config?.locale);
  const [_timezone, _setTimezone] = useState(props?.config?.timezone);

  const {
    children,
    config: {
      host,
      token,
      getToken,
      tokenRefetchInternal = 1000 * 60 * 60 * 23, // 23 hours
      locale = "en-US",
      locales = ["en-US", "de-DE"],
      languages,
      timezone,
      timezones = TIMEZONES,
      socket = false,
    },
    t,
    onLocaleChange,
    onTimezoneChange,
  } = props;

  if (!token && !getToken) {
    console.error(
      "To use RoqProvider you must provide valid token or getToken callback."
    );
  }

  const refetchPlatformToken = useCallback(() => {
    return new Promise((res, rej) => {
      try {
        if (!getToken) {
          return;
        }

        const waitForToken = async () => {
          const token = await getToken();

          _setToken(token);
          _setTokenRefreshedAt(+new Date());
          res(token);
        };

        void waitForToken();
      } catch (err) {
        rej(err);
      }
    });
  }, [getToken, _setToken, _setTokenRefreshedAt]);

  useEffect(
    function initializeTokenRefetchQueue() {
      if (token && !getToken) {
        return;
      }

      refetchPlatformToken();

      const t = setTimeout(() => {
        refetchPlatformToken();
      }, tokenRefetchInternal);

      return () => clearTimeout(t);
    },
    [refetchPlatformToken, tokenRefetchInternal]
  );

  const checkIfTokenValid = useCallback(() => {
    const previous = _tokenRefreshedAt;
    const now = Date.now();

    return !_token || now - previous > tokenRefetchInternal;
  }, [_token, _tokenRefreshedAt, tokenRefetchInternal]);

  const platformUrls = useMemo<
    Pick<
      RoqProviderContextInterface,
      | "platformInternal"
      | "platformConsole"
      | "platformClientSide"
      | "platformServerSide"
      | "platformChat"
    >
  >(
    () => ({
      platformInternal: `${host}${PLATFORM_INTERNAL_POSTFIX}`,
      platformConsole: `${host}${PLATFORM_CONSOLE_POSTFIX}`,
      platformClientSide: `${host}${PLATFORM_CLIENT_SIDE_POSTFIX}`,
      platformServerSide: `${host}${PLATFORM_SERVER_SIDE_POSTFIX}`,
      platformChat: `${host}${PLATFORM_CHAT_POSTFIX}`,
    }),
    [host]
  );

  const messages = useMemo(() => {
    switch (_locale) {
      case "de-DE":
        return deMessages;
      case "en-US":
      default:
        return enMessages;
    }
  }, [_locale]);

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

  const state = useMemo<RoqProviderContextInterface>(
    () => ({
      ...defaultCtx,
      host: host,
      token: _token,
      ...platformUrls,
      t: t ?? translate,
      locale: _locale,
      locales,
      onLocaleChange: setLocale,
      timezone: _timezone,
      timezones,
      languages: languages ?? defaultLanguages,
      onTimezoneChange: setTimezone,
    }),
    [
      host,
      _token,
      platformUrls,
      t,
      _locale,
      locales,
      setLocale,
      _timezone,
      timezones,
      setTimezone,

      translate,
      languages,
      defaultLanguages,
    ]
  );

  const ConditionalSocketWrapper = useMemo(() => {
    return socket ? SocketWrapper : DummyWrapper;
  }, [socket]);

  return (
    <ROQContext.Provider value={state}>
      {!!_token ? (
        <ApolloWrapper host={platformUrls.platformServerSide} token={_token}>
          <ConditionalSocketWrapper>{children}</ConditionalSocketWrapper>
        </ApolloWrapper>
      ) : null}
    </ROQContext.Provider>
  );
};

const DummyWrapper = ({ children }: { children: any }) => children;

const SocketWrapper = ({ children }: { children: any }) => (
  <SocketProvider>{children}</SocketProvider>
);

const ApolloWrapper = ({
  children,
  token,
  host,
}: {
  children: ReactNode;
  host: string;
  token: string | undefined;
}) => {
  const apolloClient = useApollo({
    host,
    token,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
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
