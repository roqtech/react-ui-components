import "./chat-message.scss";

import clsx from "classnames";
import React, { CSSProperties, ReactNode, ComponentType } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatMessageBubble,
  ChatMessageBubbleProps,
} from "../chat-message-bubble";
import { Avatar, TimeAgo } from "src/components/common";
import { ChatUserInterface } from "src/types";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message";

export interface ChatMessageProps
  extends Pick<ChatMessageBubbleProps, "isSent" | "showCorner"> {
  showUser: boolean;
  showTime: boolean;
  message: ReactNode;
  timestamp: Date | string | number;
  user: ChatUserInterface;
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
    Content: ComponentType<ChatMessageBubbleProps>;
    User: ComponentType<any>;
    Time: ComponentType<any>;
    Name: ComponentType<any>;
    Avatar: ComponentType<any>;
  };
}

export const ChatMessage = (props: ChatMessageProps) => {
  const {
    isSent,
    showCorner,
    showTime = true,
    showUser = true,
    message,
    timestamp,
    user,
    style,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const Content = components?.Content ?? "div";
  const Message = components?.Message ?? ChatMessageBubble;

  const User = components?.User ?? "div";
  const Time = components?.Time ?? TimeAgo;
  const UserName = components?.Name ?? "span";
  const UserAvatar = components?.Avatar ?? Avatar;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--sent"]: isSent,
        [_CLASS_IS + "--received"]: !isSent,
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
          <Message
            className={clsx(
              _CLASS_IS + "__inner__content__message",
              classNames?.content
            )}
            message={message}
            isSent={isSent}
            showCorner={showCorner}
          />
        </Content>

        {showTime && (
          <Time
            components={{ container: "p" }}
            className={clsx(_CLASS_IS + "__inner__time", classNames?.time)}
          >
            {timestamp}
          </Time>
        )}
      </Inner>
    </Container>
  );
};
