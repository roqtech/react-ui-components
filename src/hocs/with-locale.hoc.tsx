import React, { ComponentType, FunctionComponent, useMemo } from "react";
import { RoqProviderLocaleContextInterface } from "src/components";
import { useRoqComponentLocale } from "src/hooks";

export interface WithLocaleComponentProps {}

export function withLocale<TProps, TLocaleProps = TProps>(
  mapContextToProps: (
    context: RoqProviderLocaleContextInterface,
    ownProps: TProps
  ) => TLocaleProps
): (
  WrappedComponent: ComponentType<any>
) => ComponentType<Omit<TProps, keyof TLocaleProps> & TLocaleProps> {
  
  const withLocaleComponent: FunctionComponent<
    Omit<TProps, keyof TLocaleProps> & TLocaleProps
  > = (props: TProps) => {
    const localeContext = useRoqComponentLocale();
    const localeProps = mapContextToProps(localeContext, props);

    return <WrappedComponent {...localeProps} {...props} />;
  };

  return withLocaleComponent;
}
