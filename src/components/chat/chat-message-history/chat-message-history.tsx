import "./chat-message-history.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, useCallback } from "react";

import { ChatMessage, ChatMessageProps } from "../chat-message/chat-message";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatState } from "../chat-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-history";

export interface ChatMessageHistoryProps {
  messages: any[];
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    line?: string;
    message?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Line: ComponentType<any>;
    Message: ComponentType<ChatMessageProps>;
  };
}

export const ChatMessageHistory = (props: ChatMessageHistoryProps) => {
  const { messages, style, className, classNames, components } = props;

  const Container = components?.Container ?? "div";
  const Line = components?.Line ?? "div";
  const LineMessage = components?.Message ?? ChatMessage;

  const renderMessage = useCallback(
    (message) => {
      return (
        <LineMessage
          {...message}
          className={clsx(_CLASS_IS + "__line__message", classNames?.message)}
        />
      );
    },
    [LineMessage, classNames?.message]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {messages.map((message) => (
        <Line
          className={clsx(_CLASS_IS + "__line", classNames?.line, {
            [_CLASS_IS + "__line-sent"]: message.isSent,
            [_CLASS_IS + "__line-received"]: !message.isSent,
          })}
        >
          {renderMessage(message)}
        </Line>
      ))}
    </Container>
  );
};

export default withChatState(({ currentConversation }) => ({
  messages: currentConversation?.messages,
}))(ChatMessageHistory);
