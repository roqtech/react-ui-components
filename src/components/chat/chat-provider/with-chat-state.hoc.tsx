import React, { forwardRef } from "react";
import { ChatStateContext, ChatStateContextInterface } from "./chat-provider";
import { useChatApi } from "./use-chat-api.hook";

// TODO: DEV ONLY!
const MOCKED_STATE = {
  setCurrentConversationId: null,
  currentConversation: {},
  messages: {
    error: null,
    isLoading: false,
    hasMore: false,
    offset: 0,
    limit: 10,
    totalCount: 0,
    loadedTotal: 0,
    data: [],
  },
  conversations: {
    error: null,
    isLoading: false,
    hasMore: false,
    offset: 0,
    limit: 10,
    totalCount: 0,
    loadedTotal: 0,
    data: [],
  },
};

export function withChatState<TProps, TContext = Partial<TProps>>(
  mapContextToProps: (
    context: ChatStateContextInterface,
    ownProps: unknown
  ) => TContext
): (Component: React.ComponentType<any>) => React.ComponentType<TProps> {
  if (!mapContextToProps) {
    throw "withChatState requires mapContextToProps function";
  }

  return function (Component: React.ComponentType<any>) {
    class WithChatState extends React.Component<TProps> {
      render() {
        return (
          <ChatStateContext.Consumer>
            {(state) => (
              <Component
                {...mapContextToProps(state ?? MOCKED_STATE, this.props)}
                {...this.props}
                ref={this.props.forwardedRef}
                forwardedRef={this.props.forwardedRef}
              />
            )}
          </ChatStateContext.Consumer>
        );
      }
    }

    WithChatState.displayName =
      Component.displayName || Component.name || "WithChatState";

    return forwardRef((props, ref) => {
      return <WithChatState {...props} forwardedRef={ref} />;
    });
  };
}
