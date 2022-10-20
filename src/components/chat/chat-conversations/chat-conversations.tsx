import "./chat-conversations.scss";

import clsx from "classnames";
import React, { CSSProperties, ComponentType, useCallback } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatConversationCard,
  ChatConversationCardProps,
} from "../chat-conversation-card";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversations";

export interface ConversationInterface {
  title?: string;
  ownerId: unknown;
  users: unknown[];
}

export interface ChatConversationsProps {
  conversations: ConversationInterface[];
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    conversationCard?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    Inner?: ComponentType<any>;
    ConversationCard?: ComponentType<ChatConversationCardProps>;
  };
}

export const ChatConversations = (props: ChatConversationsProps) => {
  const { conversations, style, className, classNames, components } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const ConversationCard = components?.ConversationCard ?? ChatConversationCard;

  const renderConversationCard = useCallback(
    (conversationCardProps) => (
      <ConversationCard
        className={clsx(
          _CLASS_IS + "__inner" + "__card",
          classNames?.conversationCard
        )}
        {...conversationCardProps}
      />
    ),
    [ConversationCard]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Inner className={clsx(classNames?.inner, _CLASS_IS + "__inner")}>
        {conversations.map(renderConversationCard)}
      </Inner>
    </Container>
  );
};
