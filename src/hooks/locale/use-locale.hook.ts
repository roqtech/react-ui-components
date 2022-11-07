import {
  useRoqComponents,
  RoqProviderContextInterface,
} from "src/components/core/roq-provider";

export interface UseLocaleInterface
  extends Pick<
    RoqProviderContextInterface,
    "locale" | "locales" | "onLocaleChange"
  > {}

export const useLocale = (): UseLocaleInterface => {
  const context = useRoqComponents();

  const { locale, locales, onLocaleChange } = context;

  return { locale, locales, onLocaleChange };
};
