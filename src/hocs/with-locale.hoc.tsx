import React, {
  ComponentType,
  forwardRef,
  FunctionComponent,
  useMemo,
} from "react";
import { ROQContext, RoqProviderLocaleContextInterface } from "src/components";
import { useRoqComponentLocale } from "src/hooks";

export interface WithLocaleComponentProps {}

export function withLocale<TProps, TLocaleProps = TProps>(
  mapContextToProps: (
    context: RoqProviderLocaleContextInterface,
    ownProps: TProps
  ) => TLocaleProps
): (
  Component: ComponentType<any>
) => ComponentType<
  Omit<TProps, keyof TLocaleProps> & WithLocaleComponentProps
> {
  if (!mapContextToProps) {
    throw "withLocale requires mapContextToProps function";
  }

  return function (Component: ComponentType<any>) {
    class WithLocaleComponent extends React.Component<
      Omit<TProps, keyof TLocaleProps> & WithLocaleComponentProps
    > {
      render() {
        return (
          <ROQContext.Consumer>
            {(context) => (
              <Component
                {...mapContextToProps(context ?? {}, this.props)}
                {...this.props}
                ref={this.props.forwardedRef}
                forwardedRef={this.props.forwardedRef}
              />
            )}
          </ROQContext.Consumer>
        );
      }
    }

    return forwardRef((props, ref) => {
      return <WithLocaleComponent {...props} forwardedRef={ref} />;
    });
  };
}
