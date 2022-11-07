import "./chat-message.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useMemo,
  HTMLAttributes,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatMessageBubble,
  ChatMessageBubblePropsInterface,
} from "../chat-message-bubble";
import { Avatar, TimeAgo } from "src/components/common";
import { ChatMessageInterface, ChatUserInterface } from "src/interfaces";
import { ChatFormattedMessage } from "src/index";
import { ChatFormattedMessagePropsInterface } from "../chat-formatted-message";
import { TimeAgoPropsInterface } from "src/components/common/time-ago/time-ago";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message";

export interface ChatMessagePropsInterface
  extends ChatMessageInterface,
    Pick<ChatMessageBubblePropsInterface, "isSent" | "showCorner"> {
  message: string;
  timestamp: Date;
  isDeleted?: boolean;
  isUpdated?: boolean;
  showUser?: boolean;
  showTime?: boolean;
  selected?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    content?: string;
    user?: string;
    userTime?: string;
    userName?: string;
    userAvatar?: string;
  };
  components?: {
    Container?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Inner?: ComponentType<any>;
    Content?: ComponentType<any>;
    MessageBubble?: ComponentType<ChatMessageBubblePropsInterface>;
    Message?: ComponentType<ChatFormattedMessagePropsInterface>;
    User?: ComponentType<any>;
    Time?: ComponentType<Pick<TimeAgoPropsInterface, "className" | "children">>;
    Name?: ComponentType<any>;
    Avatar?: ComponentType<any>;
  };
}

export const ChatMessage = (props: ChatMessagePropsInterface) => {
  const { t } = useRoqTranslation();
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
  const UserAvatar = components?.Avatar ?? Avatar;

  const messageContent = useMemo(
    () => (isDeleted ? t("chat.message.deleted") : message),
    [message, isDeleted, t]
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
