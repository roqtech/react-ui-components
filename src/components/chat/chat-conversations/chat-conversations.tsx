import "./chat-conversations.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  ReactNode,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatConversationCard,
  ChatConversationCardProps,
} from "../chat-conversation-card";
import { withChatApi, withChatState } from "../chat-provider";
import { ChatConversationInterface } from "src/types";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversations";

export interface ChatConversationsProps {
  children?: ReactNode;
  conversations: ChatConversationInterface[];
  selectedConversationId?: string;
  onConversationSelect?: (conversationId: string) => void;
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
  const {
    children,
    conversations,
    selectedConversationId,
    onConversationSelect,
  } = props;

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
        key={conversationProps.id}
        id={conversationProps.id}
        selected={selectedConversationId === conversationProps?.id}
        className={clsx(
          _CLASS_IS + "__inner" + "__card",
          classNames?.conversationCard
        )}
        message={conversationProps?.lastMessage?.body}
        timestamp={conversationProps?.lastMessageTimestamp}
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
        {children}
      </Inner>
    </Container>
  );
};

export default withChatApi(({ selectConversation }) => ({
  onConversationSelect: selectConversation,
}))(
  withChatState(({ conversations, currentConversation }) => ({
    conversations: conversations?.data,
    selectedConversationId: currentConversation?.id,
  }))(ChatConversations)
);
