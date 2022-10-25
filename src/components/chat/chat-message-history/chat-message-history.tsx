import "./chat-message-history.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { ChatMessage, ChatMessageProps } from "../chat-message/chat-message";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatState } from "../chat-provider";
import { ChatMessageInterface } from "src/types";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-history";

export interface ChatMessageHistoryProps {
  children: ReactNode;
  conversationId: string;
  messages: ChatMessageInterface[];
  isEmpty?: boolean;
  emptyMessage?: string;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    spacer?: string;
    empty?: string;
    line?: string;
    message?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Spacer: ComponentType<any>;
    Empty: ComponentType<any>;
    Line: ComponentType<any>;
    Message: ComponentType<ChatMessageProps>;
  };
}

export const ChatMessageHistory = (props: ChatMessageHistoryProps) => {
  const { style, className, classNames, components, ...rest } = props;
  const {
    children,
    messages,
    conversationId,
    isEmpty = false,
    emptyMessage = "This is the very beginning of your messaging",
  } = props;

  const Container = components?.Container ?? "div";
  const Spacer = components?.Spacer ?? "div";
  const Empty = components?.Empty ?? "div";
  const Line = components?.Line ?? "div";
  const LineMessage = components?.Message ?? ChatMessage;

  const showSpacer = useMemo(() => !isEmpty, [isEmpty]);
  const showEmpty = useMemo(() => isEmpty, [isEmpty]);

  const renderMessage = useCallback(
    (message: ChatMessageInterface) => {
      return (
        <LineMessage
          {...message}
          message={message.body}
          timestamp={message.createdAt}
          user={message.user}
          className={clsx(_CLASS_IS + "__line__message", classNames?.message)}
        />
      );
    },
    [LineMessage, classNames?.message]
  );

  console.dir(rest);
  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      ref={rest.forwaredRef}
    >
      {showSpacer && (
        <Spacer className={clsx(_CLASS_IS + "__spacer", classNames?.spacer)} />
      )}
      {showEmpty && (
        <Empty className={clsx(_CLASS_IS + "__empty", classNames?.empty)}>
          {emptyMessage}
        </Empty>
      )}
      {children}
      {messages.map((message) => (
        <Line
          key={message.id}
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

export default withChatState(
  ({ currentConversationId, messages: { data, totalCount } }) => ({
    conversationId: currentConversationId,
    messages: data ?? [],
    isEmpty: totalCount === 0,
  })
)(ChatMessageHistory);
