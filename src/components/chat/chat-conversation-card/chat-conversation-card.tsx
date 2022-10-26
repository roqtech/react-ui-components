import "./chat-conversation-card.scss";

import clsx from "classnames";
import React, { CSSProperties, ComponentType, useMemo, ReactNode } from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatConversationInterface, ChatUserInterface } from "src/types";
import {
  ChatFormattedMessage,
  Badge,
  TimeAgo,
  AvatarGroup,
  StackedText,
} from "src";
import { ChatFormattedMessageProps } from "../chat-formatted-message";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card";

export interface ChatConversationCardProps extends ChatConversationInterface {
  selected?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    top?: string;
    title?: string;
    message?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    Inner?: ComponentType<any>;
    Top?: ComponentType<any>;
    Actions?: ComponentType<any>;
    UnreadBadge?: ComponentType<any>;
    Title?: ComponentType<any>;
    Message?: ComponentType<ChatFormattedMessageProps>;
  };
}

export const ChatConversationCard = (props: ChatConversationCardProps) => {
  const { style, className, classNames, components } = props;
  const {
    title,
    timestamp,
    message,
    members,
    selected,
    unreadCount = 0,
    onClick,
  } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const Top = components?.Top ?? "div";
  const Actions = components?.Actions ?? "div";
  const UnreadBadge = components?.UnreadBadge ?? Badge;
  const Title = components?.Title ?? StackedText;
  const Message = components?.Message ?? ChatFormattedMessage;

  const hasUnreadMessages = useMemo(() => unreadCount > 0, [unreadCount]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--selected"]: selected,
        [_CLASS_IS + "--unread"]: hasUnreadMessages,
      })}
      style={style}
      onClick={onClick}
    >
      <Inner className={clsx(_CLASS_IS + "__inner", classNames?.inner)}>
        <Top className={clsx(_CLASS_IS + "__top", classNames?.top)}>
          <AvatarGroup
            users={members}
            maxCount={2}
            size="large"
            className={clsx(_CLASS_IS + "__top__avatars", classNames?.top)}
          />
          <Title
            primaryText={title}
            secondaryText={timestamp}
            components={{
              secondaryText: TimeAgo,
            }}
            classNames={{
              container: clsx(_CLASS_IS + "__top__title", classNames?.title),
              primaryText: clsx(_CLASS_IS + "__top__title__name"),
              secondaryText: clsx(_CLASS_IS + "__top__title__timestamp"),
            }}
          />
          <Actions
            className={clsx(_CLASS_IS + "__top__actions", classNames?.actions)}
          >
            {hasUnreadMessages && (
              <UnreadBadge
                classNames={{
                  container: clsx(
                    _CLASS_IS + "__top__actions__unread",
                    classNames?.unread
                  ),
                  count: clsx(
                    _CLASS_IS + "__top__actions__unread__count",
                    classNames?.unreadCount
                  ),
                }}
                count={unreadCount}
              />
            )}
          </Actions>
        </Top>
        <Message
          className={clsx(_CLASS_IS + "__message", classNames?.message)}
          content={message}
          prevew
        />
      </Inner>
    </Container>
  );
};
