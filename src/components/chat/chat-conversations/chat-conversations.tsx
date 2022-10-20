import "./chat-conversations.scss";

import clsx from "classnames";
import React, { CSSProperties, ComponentType, useCallback } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatConversationCard,
  ChatConversationCardProps,
} from "../chat-conversation-card";
import { withChatApi, withChatState } from "../chat-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversations";

export interface ConversationInterface {
  title?: string;
  ownerId: unknown;
  members: unknown[];
}

export interface ChatConversationsProps {
  conversations: ConversationInterface[];
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
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

const ChatConversations = (props: ChatConversationsProps) => {
  const { style, className, classNames, components } = props;
  const { conversations, selectedConversationId, onConversationSelect } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const ConversationCard = components?.ConversationCard ?? ChatConversationCard;

  const handleConversationClick = useCallback(
    (id) => () => {
      onConversationSelect?.(id);
    },
    [onConversationSelect]
  );

  const renderConversationCard = useCallback(
    (conversationProps) => (
      <ConversationCard
        id={conversationProps?.id}
        active={selectedConversationId === conversationProps?.id}
        className={clsx(
          _CLASS_IS + "__inner" + "__card",
          classNames?.conversationCard
        )}
        {...conversationProps}
        onClick={handleConversationClick(conversationProps?.id)}
      />
    ),
    [ConversationCard, selectedConversationId, handleConversationClick]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Inner className={clsx(classNames?.inner, _CLASS_IS + "__inner")}>
        {conversations?.map(renderConversationCard)}
      </Inner>
    </Container>
  );
};

export default withChatApi(({ selectConversation }) => ({
  onConversationSelect: selectConversation,
}))(
  withChatState(({ conversations, currentConversation }) => ({
    conversations,
    selectedConversationId: currentConversation?.id,
  }))(ChatConversations)
);
