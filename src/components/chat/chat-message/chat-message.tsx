import "./chat-message.scss";

import clsx from "classnames";
import React, { CSSProperties, ReactNode, ComponentType, useMemo } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatMessageBubble,
  ChatMessageBubbleProps,
} from "../chat-message-bubble";
import { Avatar, TimeAgo } from "src/components/common";
import { ChatMessageInterface, ChatUserInterface } from "src/types";
import { ChatFormattedMessage } from "src/index";
import { ChatFormattedMessageProps } from "../chat-formatted-message";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message";

export interface ChatMessageProps
  extends ChatMessageInterface,
    Pick<ChatMessageBubbleProps, "isSent" | "showCorner"> {
  message: string;
  timestamp: Date;
  isDeleted?: boolean;
  isUpdated?: boolean;
  showUser?: boolean;
  showTime?: boolean;
  style?: CSSProperties;
  selected?: boolean;
  className?: string;
  classNames?: {
    container?: string;
    content?: string;
    user?: string;
    userTime?: string;
    userName?: string;
    userAvatar?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Inner: ComponentType<any>;
    Content: ComponentType<any>;
    MessageBubble: ComponentType<ChatMessageBubbleProps>;
    Message: ComponentType<ChatFormattedMessageProps>;
    User: ComponentType<any>;
    Time: ComponentType<any>;
    Name: ComponentType<any>;
    Avatar: ComponentType<any>;
  };
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { style, className, classNames, components } = props;
  const {
    isSent,
    showCorner,
    showTime = true,
    showUser = true,
    message,
    timestamp,
    user,
    isDeleted,
    isUpdated,
    deletedAt,
    updatedAt,
  } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const Content = components?.Content ?? "div";
  const MessageBubble = components?.MessageBubble ?? ChatMessageBubble;
  const Message = components?.Message ?? ChatFormattedMessage;

  const User = components?.User ?? "div";
  const Time = components?.Time ?? TimeAgo;
  const UserName = components?.Name ?? "span";
  const UserAvatar = components?.Avatar ?? Avatar;

  const messageContent = useMemo(
    () => (isDeleted ? "Message deleted..." : message),
    [message, isDeleted]
  );


  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--sent"]: isSent,
        [_CLASS_IS + "--deleted"]: isDeleted,
        [_CLASS_IS + "--updated"]: isUpdated,
        [_CLASS_IS + "--received"]: !isSent,
        [_CLASS_IS + "--no-user"]: !showUser,
        [_CLASS_IS + "--no-time"]: !showTime,
      })}
      style={style}
    >
      {(showUser ?? true) && (
        <User className={clsx(_CLASS_IS + "__user", classNames?.user)}>
          <UserAvatar
            className={clsx(
              _CLASS_IS + "__user__avatar",
              classNames?.userAvatar
            )}
            {...user}
            alt={user?.fullName}
            src={user?.avatar}
          />
        </User>
      )}

      <Inner className={clsx(_CLASS_IS + "__inner", classNames?.inner)}>
        <Content
          className={clsx(_CLASS_IS + "__inner__content", classNames?.content)}
        >
          <MessageBubble
            className={clsx(
              _CLASS_IS + "__inner__content__message",
              classNames?.content
            )}
            message={<Message content={messageContent} />}
            isSent={isSent}
            showCorner={showCorner}
          />
        </Content>

        {showTime && (
          <Time
            components={{ container: "p" }}
            className={clsx(_CLASS_IS + "__inner__time", classNames?.userTime)}
          >
            {timestamp}
          </Time>
        )}
      </Inner>
    </Container>
  );
};
