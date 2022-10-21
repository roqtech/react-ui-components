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
    showUser,
    message,
    timestamp,
    user,
    style,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.Container ?? "div";
  const Content = components?.Content ?? ChatMessageBubble;

  const User = components?.User ?? "div";
  const UserTime = components?.Time ?? TimeAgo;
  const UserName = components?.Name ?? "span";
  const UserAvatar = components?.Avatar ?? Avatar;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "-sent"]: isSent,
        [_CLASS_IS + "-received"]: !isSent,
      })}
      style={style}
    >
      <Content
        className={clsx(_CLASS_IS + "__content", classNames?.content)}
        message={message}
        isSent={isSent}
        showCorner={showCorner}
      />

      {(showUser ?? true) && (
        <User className={clsx(_CLASS_IS + "__user", classNames?.user)}>
          <UserAvatar
            className={clsx(
              _CLASS_IS + "__user__avatar",
              classNames?.userAvatar
            )}
            {...user}
          />
          <UserName
            className={clsx(_CLASS_IS + "__user__name", classNames?.userName)}
          >
            {user?.fullName}
          </UserName>
          <UserTime
            className={clsx(_CLASS_IS + "__user__time", classNames?.userTime)}
            date={timestamp}
          />
        </User>
      )}
    </Container>
  );
};
