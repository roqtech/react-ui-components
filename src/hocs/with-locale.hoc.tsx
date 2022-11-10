import React, {
  ComponentType,
  forwardRef,
  ForwardedRef,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { ROQContext, RoqProviderLocaleContextInterface } from "src/components";

export function withLocale<
  Props,
  Fields extends keyof Props,
  WithLocaleProps = Omit<Props, Fields>
>(
  mapContextToProps: (
    context: RoqProviderLocaleContextInterface,
    ownProps: Props
  ) => Pick<Props, Fields>
): (
  WrappedComponent: ComponentType<Props>
) => ComponentType<
  PropsWithoutRef<WithLocaleProps> &
    RefAttributes<ComponentType<WithLocaleProps>>
> {
  if (!mapContextToProps) {
    throw "withLocale requires mapContextToProps function";
  }

  return function (WrappedComponent: any) {
    class WithLocaleComponent extends React.Component<
      WithLocaleProps & {
        forwardedRef: ForwardedRef<ComponentType<WithLocaleProps>>;
      }
    > {
      render() {
        return (
          <ROQContext.Consumer>
            {(context) => {
              const { forwardedRef, ...ownProps } = this.props;

              const localeProps = mapContextToProps(
                context ?? {},
                ownProps as Props
              );

              const componentProps = ownProps;

              return (
                <WrappedComponent
                  {...componentProps}
                  {...localeProps}
                  ref={forwardedRef}
                  forwardedRef={forwardedRef}
                />
              );
            }}
          </ROQContext.Consumer>
        );
      }
    }

    const comp = forwardRef<ComponentType<WithLocaleProps>, WithLocaleProps>(
      (props, ref) => <WithLocaleComponent {...props} forwardedRef={ref} />
    );

    comp.displayName = WrappedComponent.displayName;
    comp.propTypes = WrappedComponent.propTypes;
    comp.defaultProps = WrappedComponent.defaultProps;

    return comp;
  };
}
