import "./chat-message-history.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import {
  ChatMessage,
  ChatMessageProps,
  ChatMessagePropsInterface,
} from "../chat-message/chat-message";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatState } from "../chat-provider";
import { ChatMessageInterface } from "src/interfaces";
import {
  ChatMessageHistoryLine,
  ChatMessageHistoryLinePropsInterface,
} from "../chat-message-history-line";
import { ChatMessageMenu } from "src/index";
import { ActionButton } from "src/components/common";
import _isEmpty from "lodash/isEmpty";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-history";

export interface ChatMessageHistoryPropsInterface {
  children: ReactNode;
  conversationId: string;
  messages: ChatMessageInterface[];
  isEmpty?: boolean;
  emptyMessage?: string;
  showAvatarInGroup?: boolean;
  showTimeInGroup?: boolean;
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
    Container: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Spacer: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Empty: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Line: ComponentType<
      Pick<
        ChatMessageHistoryLinePropsInterface,
        "messageId" | "isSent" | "className" | "children"
      >
    >;
    Message: ComponentType<ChatMessagePropsInterface>;
  };
}

export const ChatMessageHistory = (props: ChatMessageHistoryPropsInterface) => {
  const { style, className, classNames, components, ...rest } = props;
  const {
    forwardedRef,
    children,
    messages,
    showAvatarInGroup = false,
    showTimeInGroup = false,
    isEmpty = false,
    emptyMessage = "This is the very beginning of your messaging",
  } = props;

  const Container = components?.Container ?? "div";
  const Spacer = components?.Spacer ?? "div";
  const Empty = components?.Empty ?? "div";
  const Line = components?.Line ?? ChatMessageHistoryLine;
  const Message = components?.Message ?? ChatMessage;

  const showSpacer = useMemo(() => !isEmpty, [isEmpty]);
  const showEmpty = useMemo(() => isEmpty, [isEmpty]);

  const renderMessage = useCallback(
    (message: ChatMessageInterface) => {
      const isDeleted = !!message.deletedAt;
      const isUpdated = !isDeleted && !!message.bodyUpdatedAt;

      const showActions = !isDeleted;

      return (
        <Message
          key={message.id}
          showUser={message.isFirstInUserGroup ?? showAvatarInGroup}
          showTime={message.isFirstInTimeGroup ?? showTimeInGroup}
          {...message}
          message={message.body}
          timestamp={message.createdAt}
          isDeleted={isDeleted}
          isUpdated={isUpdated}
          user={message.author}
          className={clsx(_CLASS_IS + "__line__message", classNames?.message, {
            [_CLASS_IS + "__line__message" + "--no-user"]:
              !message.isFirstInUserGroup,
          })}
          actions={
            showActions && (
              <ActionButton
                components={{
                  Dropdown: ChatMessageMenu,
                }}
              />
            )
          }
        />
      );
    },
    [Message, classNames?.message, showAvatarInGroup, showTimeInGroup]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      ref={forwardedRef}
      {...rest}
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
          messageId={message.id}
          isSent={message.isSent}
          className={clsx(_CLASS_IS + "__line", classNames?.line, {
            [_CLASS_IS + "__line--sent"]: message.isSent,
            [_CLASS_IS + "__line--received"]: !message.isSent,
          })}
        >
          {renderMessage(message)}
        </Line>
      ))}
    </Container>
  );
};

export default withChatState(
  ({ currentConversationId, messages: { data, totalCount, isLoading } }) => ({
    conversationId: currentConversationId,
    messages: data ?? [],
    isEmpty: !isLoading && totalCount === 0,
  })
)(ChatMessageHistory);
