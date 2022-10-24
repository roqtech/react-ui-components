import "./chat-conversation-card.scss";

import clsx from "classnames";
import React, { CSSProperties, ComponentType, useMemo } from "react";

import { AvatarGroup } from "../../common/avatar-group/avatar-group";
import { StackedText } from "../../common/stacked-text/stacked-text";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatApi } from "../chat-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card";

export interface ChatConversationCardProps {
  title: string;
  timestamp: Date | string;
  message: string;
  members: any[];
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
    Title?: ComponentType<any>;
    Message?: ComponentType<any>;
  };
}

export const ChatConversationCard = (props: ChatConversationCardProps) => {
  const {
    title,
    timestamp,
    message,
    members,
    selected,
    onClick,
    style,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const Top = components?.Top ?? "div";
  const Title = components?.Title ?? StackedText;
  const Message = components?.Message ?? "p";

  const formattedTimestamp = useMemo(
    () => new Date(timestamp).toLocaleString(),
    [timestamp]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "-selected"]: selected,
      })}
      style={style}
      onClick={onClick}
    >
      <Inner className={clsx(classNames?.inner, _CLASS_IS + "__inner")}>
        <Top className={clsx(classNames?.top, _CLASS_IS + "__top")}>
          <AvatarGroup
            users={members}
            maxCount={2}
            size="large"
            className={clsx(classNames?.top, _CLASS_IS + "__top__avatars")}
          />
          <Title
            primaryText={title}
            secondaryText={formattedTimestamp}
            className={clsx(classNames?.title, _CLASS_IS + "__top__title")}
          />
        </Top>
        <Message className={clsx(classNames?.message, _CLASS_IS + "__message")}>
          {message}
        </Message>
      </Inner>
    </Container>
  );
};
