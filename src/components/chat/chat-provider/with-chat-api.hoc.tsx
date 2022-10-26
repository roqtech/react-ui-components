import React, { forwardRef } from "react";
import { ChatApiContext, ChatApiContextInterface } from "./chat-provider";
import { useChatApi } from "./use-chat-api.hook";

type WithChatStateApiProps<T> = {
  mapContextToProps?: (context: ChatApiContextInterface) => T;
};

export function withChatApi<TProps, TContext = TProps>(
  mapContextToProps: (context: ChatApiContextInterface) => TContext
): (
  Component: React.ComponentType<any>
) => React.ComponentType<
  Omit<TProps, keyof TContext> & WithChatStateApiProps<TContext>
> {
  if (!mapContextToProps) {
    throw "withChatApi requires mapContextToProps function";
  }

  return function (Component: React.ComponentType<any>) {
    class WithChatApi extends React.Component<Omit<TProps, keyof TContext>> {
      render() {
        return (
          <ChatApiContext.Consumer>
            {(api) => (
              <Component
                {...mapContextToProps((api ?? {}) as ChatApiContextInterface)}
                {...this.props}
                ref={this.props.forwardedRef}
                forwardedRef={this.props.forwardedRef}
              />
            )}
          </ChatApiContext.Consumer>
        );
      }
    }

    return forwardRef((props, ref) => {
      return <WithChatApi {...props} forwardedRef={ref} />;
    });
  };
}
