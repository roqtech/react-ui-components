import React from "react";
import { ChatStateContext, ChatStateContextInterface } from "./chat-provider";
import { useChatApi } from "./use-chat-api.hook";

type WithChatStatePropsInterface<T> = {
  mapContextToProps?: (context: ChatStateContextInterface) => T;
};

export function withChatState<TProps, TContext = TProps>(
  mapContextToProps: (context: ChatStateContextInterface) => TContext
): (
  Component: React.ComponentType<any>
) => React.ComponentType<
  Omit<TProps, keyof TContext> & WithChatStatePropsInterface<TContext>
> {
  if (!mapContextToProps) {
    throw "withChatState requires mapContextToProps function";
  }

  return function (Component: React.ComponentType<any>) {
    class WithChatState extends React.Component<Omit<TProps, keyof TContext>> {
      render() {
        return (
          <ChatStateContext.Consumer>
            {(state) => (
              <Component
                {...mapContextToProps(state as ChatStateContextInterface)}
                {...this.props}
              />
            )}
          </ChatStateContext.Consumer>
        );
      }
    }

    return WithChatState;
  };
}
