import "./chat-conversation-card.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useMemo,
  ReactNode,
  HTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatConversationInterface, ChatUserInterface } from "src/interfaces";
import {
  ChatFormattedMessage,
  Badge,
  TimeAgo,
  AvatarGroup,
  StackedText,
} from "src";
import { ChatFormattedMessagePropsInterface } from "../chat-formatted-message";
import { BadgePropsInterface } from "src/components/common/badge";
import { StackedTextPropsInterface } from "src/components/common/stacked-text";
import { AvatarGroupPropsInterface } from "src/components/common/avatar-group";
import { AvatarSizeType } from "src/components/common/avatar/avatar";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card";

export interface ChatConversationCardPropsInterface
  extends ChatConversationInterface {
  oneToOneChatAvatarSize?: AvatarSizeType;
  groupChatAvatarSize?: AvatarSizeType;

  timestamp?: Date;
  children?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  actions?: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    highlight?: string;
    info?: string;
    top?: string;
    avatars?: string;
    title?: string;
    message?: string;
    timestamp?: string;
    actions?: string;
    unread?: string;
    unreadCount?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
    Highligh?: ComponentType<HTMLAttributes<HTMLElement>>;
    Inner?: ComponentType<HTMLAttributes<HTMLElement>>;
    Top?: ComponentType<HTMLAttributes<HTMLElement>>;
    Actions?: ComponentType<HTMLAttributes<HTMLElement>>;
    Avatars?: ComponentType<
      Pick<
        AvatarGroupPropsInterface,
        "users" | "maxCount" | "size" | "className"
      >
    >;
    UnreadBadge?: ComponentType<
      Pick<BadgePropsInterface, "classNames" | "count">
    >;
    Title?: ComponentType<
      Pick<
        StackedTextPropsInterface,
        "primaryText" | "secondaryText" | "components" | "classNames"
      >
    >;
    Message?: ComponentType<
      Pick<
        ChatFormattedMessagePropsInterface,
        "className" | "content" | "preview"
      >
    >;
  };
}

export const ChatConversationCard = (
  props: ChatConversationCardPropsInterface
) => {
  const { style, className, classNames, components, ...rest } = props;
  const {
    children,
    title,
    timestamp,
    message,
    members,
    selected,
    unreadCount = 0,
    onClick,
    actions,
    isGroup,
    oneToOneChatAvatarSize = "extra-large",
    groupChatAvatarSize = "medium",
  } = rest;

  const Container = components?.Container ?? "div";
  const Highlight = components?.Highlight ?? "div";
  const Inner = components?.Inner ?? "div";
  const Info = components?.Info ?? "div";
  const Title = components?.Title ?? "h6";
  const Message = components?.Message ?? ChatFormattedMessage;
  const Timestamp = components?.Timestamp ?? TimeAgo;

  const Actions = components?.Actions ?? "div";
  const Avatars = components?.Avatars ?? AvatarGroup;
  const UnreadBadge = components?.UnreadBadge ?? Badge;

  const hasUnreadMessages = useMemo(() => unreadCount > 0, [unreadCount]);

  const avatarSize = useMemo(
    () => (isGroup ? groupChatAvatarSize : oneToOneChatAvatarSize),
    [isGroup, oneToOneChatAvatarSize, groupChatAvatarSize]
  );

  const avatarMaxCount = useMemo(() => (isGroup ? 2 : 1), [isGroup]);

  const avatarUsers = useMemo(
    () => (isGroup ? members : [members[0]]),
    [isGroup, members]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--selected"]: selected,
        [_CLASS_IS + "--unread"]: hasUnreadMessages,
      })}
      style={style}
      onClick={onClick}
    >
      <Highlight
        className={clsx(_CLASS_IS + "__highlight", classNames?.highlight)}
      />

      <Inner className={clsx(_CLASS_IS + "__inner", classNames?.inner)}>
        {children}
        {!children && (
          <>
            <Avatars
              users={avatarUsers}
              maxCount={avatarMaxCount}
              size={avatarSize}
              displayTotal={isGroup}
              className={clsx(
                _CLASS_IS + "__inner__avatars",
                classNames?.avatars
              )}
            />
            <Info
              displayTotal={isGroup}
              className={clsx(_CLASS_IS + "__inner__info", classNames?.info)}
            >
              <Title
                className={clsx(
                  _CLASS_IS + "__inner__info__title",
                  classNames?.title
                )}
              >
                {title}
              </Title>
              <Message
                className={clsx(
                  _CLASS_IS + "__inner__info__message",
                  classNames?.message
                )}
                content={message ?? "<p>&nbs"}
              />
              <Timestamp
                className={clsx(
                  _CLASS_IS + "__inner__info__timestamp",
                  classNames?.timestamp
                )}
              >
                {timestamp}
              </Timestamp>
            </Info>
            <Actions
              className={clsx(
                _CLASS_IS + "__inner__actions",
                classNames?.actions
              )}
            >
              {actions}
              {hasUnreadMessages && (
                <UnreadBadge
                  classNames={{
                    container: clsx(
                      _CLASS_IS + "__inner__actions__unread",
                      classNames?.unread
                    ),
                    count: clsx(
                      _CLASS_IS + "__inner__actions__unread__count",
                      classNames?.unreadCount
                    ),
                  }}
                  count={unreadCount}
                />
              )}
            </Actions>
          </>
        )}
      </Inner>
    </Container>
  );
};
