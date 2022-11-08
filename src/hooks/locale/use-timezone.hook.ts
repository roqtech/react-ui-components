import {
  useRoqComponents,
  RoqProviderContextInterface,
} from "src/components/core/roq-provider";

export interface UseTimezonesInterface
  extends Pick<
    RoqProviderContextInterface,
    "timezone" | "timezones" | "onTimezoneChange"
  > {}

export const useTimezone = (): UseTimezonesInterface => {
  const context = useRoqComponents();

  const { timezone, timezones, onTimezoneChange } = context;

  return { timezone, timezones, onTimezoneChange };
};
