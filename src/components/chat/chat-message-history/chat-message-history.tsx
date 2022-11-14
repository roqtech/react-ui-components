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
import { useRoqTranslation } from "src/components/core/roq-provider";
import { MailIcon as DefaultIcon } from "./mail-icon";

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
    emtpyIconWrapper?: string;
    emtpyIcon?: string;
    emptyMessage?: string;
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
    EmptyIconWrapper: ComponentType<HTMLAttributes<HTMLElement>>;
    EmptyIcon: ComponentType<HTMLAttributes<HTMLElement>>;
    EmptyMessage: ComponentType<HTMLAttributes<HTMLElement>>;
    Line: ComponentType<
      Pick<
        ChatMessageHistoryLinePropsInterface,
        | "messageId"
        | "isSent"
        | "className"
        | "showDateSeparator"
        | "timestamp"
        | "children"
      >
    >;
    Message: ComponentType<ChatMessagePropsInterface>;
  };
}

export const ChatMessageHistory = (props: ChatMessageHistoryPropsInterface) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components, ...rest } = props;
  const {
    forwardedRef,
    children,
    messages,
    showAvatarInGroup = false,
    showTimeInGroup = false,
    isEmpty = false,
    emptyMessage,
  } = props;

  const Container = components?.Container ?? "div";
  const Spacer = components?.Spacer ?? "div";
  const Empty = components?.Empty ?? "div";
  const EmptyIconWrapper = components?.EmptyIconWrapper ?? "div";
  const EmptyIcon = components?.EmptyIcon ?? DefaultIcon;
  const EmptyMessage = components?.EmptyMessage ?? "div";

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
        <Line
          key={message.id}
          messageId={message.id}
          isSent={message.isSent}
          showDateSeparator={message.isFirstInTimeGroup}
          timestamp={message.createdAt}
          className={clsx(_CLASS_IS + "__line", classNames?.line, {
            [_CLASS_IS + "__line--sent"]: message.isSent,
            [_CLASS_IS + "__line--received"]: !message.isSent,
          })}
        >
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
            className={clsx(
              _CLASS_IS + "__line__message",
              classNames?.message,
              {
                [_CLASS_IS + "__line__message" + "--no-user"]:
                  !message.isFirstInUserGroup,
              }
            )}
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
        </Line>
      );
    },
    [Message, Line, classNames?.message, showAvatarInGroup, showTimeInGroup]
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
          <EmptyIconWrapper
            className={clsx(
              _CLASS_IS + "__empty__icon-wrapper",
              classNames?.emtpyIconWrapper
            )}
          >
            <EmptyIcon
              className={clsx(
                _CLASS_IS + "__empty__icon-wrapper__icon",
                classNames?.emtpyIcon
              )}
            />
          </EmptyIconWrapper>
          <EmptyMessage
            className={clsx(
              _CLASS_IS + "__empty__message",
              classNames?.emptyMessage
            )}
          >
            {emptyMessage ?? t("chat.message-history.empty")}
          </EmptyMessage>
        </Empty>
      )}
      {children}
      {messages.map(renderMessage)}
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
