import React, {
  ComponentType,
  forwardRef,
  ForwardedRef,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { ChatStateContext, ChatStateContextInterface } from "./chat-provider";

export function withChatState<
  Props,
  Fields extends keyof Props,
  WithChatStateProps = Props
>(
  mapContextToProps: (
    context: ChatStateContextInterface,
    ownProps: Props
  ) => Pick<Props, Fields>
): (
  WrappedComponent: ComponentType<Props>
) => ComponentType<
  PropsWithoutRef<WithChatStateProps> &
    RefAttributes<ComponentType<WithChatStateProps>>
> {
  if (!mapContextToProps) {
    throw "withChatState requires mapContextToProps function";
  }

  return function (WrappedComponent: any) {
    class WithChatApiComponent extends React.Component<
      WithChatStateProps & {
        forwardedRef: ForwardedRef<ComponentType<WithChatStateProps>>;
      }
    > {
      render() {
        return (
          <ChatStateContext.Consumer>
            {(context) => {
              const { forwardedRef, ...ownProps } = this.props;


              const stateProps = context
                ? mapContextToProps(context, ownProps as Props)
                : {};

              const componentProps = ownProps;

              return (
                <WrappedComponent
                  {...stateProps}
                  {...componentProps}
                  ref={forwardedRef}
                  forwardedRef={forwardedRef}
                />
              );
            }}
          </ChatStateContext.Consumer>
        );
      }
    }

    const comp = forwardRef<
      ComponentType<WithChatStateProps>,
      WithChatStateProps
    >((props, ref) => <WithChatApiComponent {...props} forwardedRef={ref} />);

    comp.displayName = WrappedComponent.displayName;
    comp.propTypes = WrappedComponent.propTypes;
    comp.defaultProps = WrappedComponent.defaultProps;

    return comp;
  };
}
