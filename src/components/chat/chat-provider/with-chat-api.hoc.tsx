import React, {
  ComponentType,
  forwardRef,
  ForwardedRef,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { ChatApiContext, ChatApiContextInterface } from "./chat-provider";

export function withChatApi<
  Props,
  Fields extends keyof Props,
  WithChatApiProps = Omit<Props, Fields>
>(
  mapContextToProps: (
    context: ChatApiContextInterface,
    ownProps: Props
  ) => Pick<Props, Fields>
): (
  WrappedComponent: ComponentType<Props>
) => ComponentType<
  PropsWithoutRef<WithChatApiProps> &
    RefAttributes<ComponentType<WithChatApiProps>>
> {
  if (!mapContextToProps) {
    throw "withChatApi requires mapContextToProps function";
  }

  return function (WrappedComponent: any) {
    class WithChatApiComponent extends React.Component<
      WithChatApiProps & {
        forwardedRef: ForwardedRef<ComponentType<WithChatApiProps>>;
      }
    > {
      render() {
        return (
          <ChatApiContext.Consumer>
            {(context) => {
              const { forwardedRef, ...ownProps } = this.props;

              const localeProps = context
                ? mapContextToProps(context, ownProps as Props)
                : {};

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
          </ChatApiContext.Consumer>
        );
      }
    }

    const comp = forwardRef<ComponentType<WithChatApiProps>, WithChatApiProps>(
      (props, ref) => <WithChatApiComponent {...props} forwardedRef={ref} />
    );

    comp.displayName = WrappedComponent.displayName;
    comp.propTypes = WrappedComponent.propTypes;
    comp.defaultProps = WrappedComponent.defaultProps;

    return comp;
  };
}
