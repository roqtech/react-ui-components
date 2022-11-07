import {
  useRoqComponents,
  RoqProviderContextInterface,
} from "src/components/core/roq-provider";

export interface UseRoqComponentLocaleInterface
  extends Pick<
    RoqProviderContextInterface,
    | "locale"
    | "locales"
    | "onLocaleChange"
    | "timezone"
    | "timezones"
    | "onTimezoneChange"
  > {}

export const useRoqComponentLocale = (): UseRoqComponentLocaleInterface => {
  const context = useRoqComponents();

  const {
    timezone,
    timezones,
    onTimezoneChange,
    locale,
    locales,
    onLocaleChange,
  } = context;

  return {
    timezone,
    timezones,
    onTimezoneChange,
    locale,
    locales,
    onLocaleChange,
  };
};
