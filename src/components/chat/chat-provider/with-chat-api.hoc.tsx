import React from "react";
import { ChatApiContextInterface } from "./chat-provider";

type withChatApiProps<T> = {
  mapContextToProps?: (context: ChatApiContextInterface) => T;
};

export function withChatApi<TProps, TContext = TProps>(
  mapContextToProps: (context: ChatApiContextInterface) => TContext
): (
  Component: React.ComponentType<any>
) => React.ComponentType<
  Omit<TProps, keyof TContext> & withChatApiProps<TContext>
> {
  if (!mapContextToProps) {
    throw "withChatApi requires mapContextToProps function";
  }

  return function (Component: React.ComponentType<any>) {
    class WithChatApi extends React.PureComponent<
      Omit<TProps, keyof TContext>
    > {
      render() {
        const { ...rest } = this.props;

        return <Component {...this.state} {...rest} />;
      }
    }

    return WithChatApi;
  };
}
