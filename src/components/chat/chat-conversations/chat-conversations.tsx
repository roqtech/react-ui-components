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
  ChatConversationCardPropsInterface,
} from "../chat-conversation-card";
import { withChatApi, withChatState } from "../chat-provider";
import { ChatConversationInterface } from "src/interfaces";
import { ActionButton } from "src/components/common";
import {
  ChatConversationMenu,
  ChatConversationMenuPropsInterface,
} from "../chat-conversation-menu";
import { ChatConversationCardForm } from "../chat-conversation-card-form";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversations";

export interface ChatConversationsPropsInterface {
  children?: ReactNode;
  conversations: ChatConversationInterface[];
  selectedConversationId?: string | null;
  editableConversationId?: string | null;
  onConversationSelect?: (conversationId: string) => void;
  onEditFormCancel: () => void;
  onEditFormSubmit: (values: Partial<ChatConversationInterface>) => void;
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
    ConversationCard?: ComponentType<ChatConversationCardPropsInterface>;
    ConversationForm?: ComponentType<ChatConversationCardFormPropsInterface>;
    ConversationMenu?: ComponentType<ChatConversationMenuPropsInterface>;
  };
}

const ChatConversations = (props: ChatConversationsPropsInterface) => {
  const { style, className, classNames, components } = props;
  const {
    children,
    conversations,
    selectedConversationId,
    editableConversationId,
    onConversationSelect,
    onEditFormCancel,
    onEditFormSubmit,
  } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const ConversationCard = components?.ConversationCard ?? ChatConversationCard;
  const ConversationForm =
    components?.ConversationForm ?? ChatConversationCardForm;
  const ConversationMenu = components?.ConversationMenu ?? ChatConversationMenu;

  const handleConversationClick = useCallback(
    (id) => () => {
      onConversationSelect?.(id);
    },
    [onConversationSelect]
  );

  const isConversationEditable = useCallback(
    (conversation: ChatConversationInterface) => {
      return conversation.id === editableConversationId;
    },
    [editableConversationId]
  );

  const renderConversationCardEditForm = useCallback(
    (conversation: ChatConversationInterface) => {
      return (
        <ConversationForm
          initialValues={conversation}
          onSubmit={onEditFormSubmit}
          onCancel={onEditFormCancel}
        />
      );
    },
    [ConversationForm, onEditFormCancel, onEditFormSubmit]
  );

  const renderConversationCard = useCallback(
    (conversationProps) => {
      const content = isConversationEditable(conversationProps)
        ? renderConversationCardEditForm(conversationProps)
        : null;

      return (
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
          actions={
            <ActionButton
              components={{
                Dropdown: (props) =>
                  ConversationMenu({
                    ...props,
                    conversationId: conversationProps.id,
                  }),
              }}
            />
          }
        >
          {content}
        </ConversationCard>
      );
    },
    [
      ConversationCard,
      ConversationMenu,
      selectedConversationId,
      handleConversationClick,
      isConversationEditable,
      renderConversationCardEditForm,
    ]
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

export default withChatApi<ChatConversationsProps>(
  ({ selectConversation, resetEditableConversation, renameConversation }) => ({
    onConversationSelect: selectConversation,
    onEditFormCancel: resetEditableConversation,
    onEditFormSubmit: ({ title }) => {
      renameConversation(title);
      resetEditableConversation();
    },
  })
)(
  withChatState<ChatConversationsProps>(
    ({ conversations, currentConversation }) => ({
      conversations: conversations?.data,
      selectedConversationId: currentConversation?.id,
      editableConversationId: conversations?.editableId,
    })
  )(ChatConversations)
);
