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

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card";

export interface ChatConversationCardPropsInterface extends ChatConversationInterface {
  timestamp?: Date;
  children?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  actions?: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    top?: string;
    avatars?: string;
    title?: string;
    actions?: string;
    unread?: string;
    unreadCount?: string;
    message?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
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

export const ChatConversationCard = (props: ChatConversationCardPropsInterface) => {
  const { style, className, classNames, components } = props;
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
  } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const Top = components?.Top ?? "div";
  const Actions = components?.Actions ?? "div";
  const Avatars = components?.Avatars ?? AvatarGroup;
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
        {children}
        {!children && (
          <>
            <Top className={clsx(_CLASS_IS + "__top", classNames?.top)}>
              <Avatars
                users={members}
                maxCount={1}
                size="large"
                className={clsx(
                  _CLASS_IS + "__top__avatars",
                  classNames?.avatars
                )}
              />
              <Title
                primaryText={title}
                secondaryText={timestamp}
                components={{
                  SecondaryText: TimeAgo,
                }}
                classNames={{
                  container: clsx(
                    _CLASS_IS + "__top__title",
                    classNames?.title
                  ),
                  primaryText: clsx(_CLASS_IS + "__top__title__name"),
                  secondaryText: clsx(_CLASS_IS + "__top__title__timestamp"),
                }}
              />
              <Actions
                className={clsx(
                  _CLASS_IS + "__top__actions",
                  classNames?.actions
                )}
              >
                {actions}
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
              preview
            />
          </>
        )}
      </Inner>
    </Container>
  );
};
