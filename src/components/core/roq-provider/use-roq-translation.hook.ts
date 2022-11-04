import { RoqProviderContextInterface, useRoqComponents, useRoqContext } from "./roq-provider";

export interface UseRoqTranslationHookInterface {
  t: RoqProviderContextInterface["t"];
}

export const useRoqTranslation = (): UseRoqTranslationHookInterface => {
  const { t } = useRoqComponents();

  return { t };
};
