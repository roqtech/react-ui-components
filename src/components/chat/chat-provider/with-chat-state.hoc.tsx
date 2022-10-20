import React from "react";
import { ChatStateContextInterface } from "./chat-provider";

type withChatStateProps<T> = {
  mapContextToProps?: (context: ChatStateContextInterface) => T;
};

export function withChatState<TProps, TContext>(
  mapContextToProps: (context: ChatStateContextInterface) => TContext
): (
  Component: React.ComponentType<any>
) => React.ComponentType<
  Omit<TProps, keyof TContext> & withChatStateProps<TContext>
> {
  if (!mapContextToProps) {
    throw "withChatState requires mapContextToProps function";
  }

  return function (Component: React.ComponentType<any>) {
    class WithChatState extends React.PureComponent<
      Omit<TProps, keyof TContext>
    > {
      render() {
        const { ...rest } = this.props;

        return <Component {...this.state} {...rest} />;
      }
    }

    return WithChatState;
  };
}
