import "./chat-conversation-card.scss";

import clsx from "classnames";
import React, { CSSProperties, ComponentType } from "react";

import { AvatarGroup } from "../../common/avatar-group/avatar-group";
import { StackedText } from "../../common/stacked-text/stacked-text";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withConversationCard } from "./with-conversation-card.hoc";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card";

export interface ChatConversationCardProps {
  title: string;
  date: string;
  message: string;
  members: any[];
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

const ChatConversationCard = (props: ChatConversationCardProps) => {
  const {
    title,
    date,
    message,
    members,
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

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Inner className={clsx(classNames?.inner, _CLASS_IS + "__inner")}>
        <Top className={clsx(classNames?.top, _CLASS_IS + "__top")}>
          <AvatarGroup
            data={members}
            maxCount={2}
            size="large"
            className={clsx(classNames?.top, _CLASS_IS + "__top__avatars")}
          />
          <Title
            primaryText={title}
            secondaryText={date}
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

export default withConversationCard(ChatConversationCard)