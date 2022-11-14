import "./chat.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatWindow,
  ChatConversationNotSelectedPanel,
  ChatMembersPanel,
} from "src/index";
import {
  ChatScreenEnum,
  useChatArchiveConversation,
  useChatScreen,
  useChatCreateConversation,
  useChatCurrentConversation,
  useChatUpdateConversation,
  useChatUpdateConversationMembers,
  useChatLeaveConversation,
} from "src/hooks";
import { ChatConversationListPropsInterface } from "../chat-conversation-list";
import { ChatConversationMenu } from "../chat-conversation-menu";
import { useRoqTranslation } from "src/components/core/roq-provider";
import { ChatConversationNotSelectedPanelPropsInterface } from "../chat-conversation-not-selected-panel";
import { ChatMembersPanelPropsInterface } from "../chat-members-panel";
import { ChatWindowPropsInterface } from "../chat-window";
import { ChatSidebar } from "src/components";
import { ChatCreateConversationRequestPayloadInterface } from "src/interfaces";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat";

export interface ChatPropsInterface {
  title?: string;
  actionButtonLabel?: string;
  conversationTitle?: string;
  groupConverstionTitle?: string;
  addMemberTitle?: string;
  removeMemberTitle?: string;
  conversationNotSelectedMessage?: string;

  showActionButton?: boolean;

  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    title?: string;
    button?: string;
    buttonLabel?: string;
    buttonIcon?: string;
    content?: string;
    sidebar?: string;
    panel?: string;

    createConversation?: string;
    addMembers?: string;
    removeMembers?: string;
  };
  components?: {
    Container: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Header: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Title: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Button: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    ButtonLabel: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    ButtonIcon: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Content: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Sidebar: ComponentType<
      Pick<
        ChatConversationListPropsInterface,
        "className" | "onConversationSelect" | "components"
      >
    >;
    ConversationSelected: ComponentType<
      Pick<ChatWindowPropsInterface, "components">
    >;
    ConversationNotSelected: ComponentType<
      Pick<ChatConversationNotSelectedPanelPropsInterface, "message">
    >;
    CreateConversation: ComponentType<
      Pick<
        ChatMembersPanelPropsInterface,
        "className" | "onSubmit" | "onCancel"
      >
    >;
    AddMembers: ComponentType<
      Pick<
        ChatMembersPanelPropsInterface,
        | "titleLabel"
        | "className"
        | "onCancel"
        | "onSubmit"
        | "initialSelectedIds"
        | "initialFilter"
      >
    >;
    RemoveMembers: ComponentType<
      Pick<
        ChatMembersPanelPropsInterface,
        | "titleLabel"
        | "className"
        | "onCancel"
        | "onSubmit"
        | "initialSelectedIds"
        | "initialFilter"
      >
    >;
  };
}

type EditingTriggerType = "sidebar" | "chat";

export const Chat = (props: ChatPropsInterface) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components } = props;
  const {
    title,
    conversationTitle,
    groupConverstionTitle,
    addMemberTitle,
    removeMemberTitle,
    conversationNotSelectedMessage,

    showActionButton = true,
  } = props;

  const Container = components?.Container ?? "div";
  const Content = components?.Content || "div";

  const Sidebar = components?.Sidebar ?? ChatSidebar;

  const ConversationNotSelected =
    components?.ConversationNotSelected ?? ChatConversationNotSelectedPanel;

  const ConversationSelected = components?.ConversationSelected ?? ChatWindow;

  const CreateConversation = components?.CreateConversation ?? ChatMembersPanel;
  const AddMembers = components?.AddMembers ?? ChatMembersPanel;
  const RemoveMembers = components?.RemoveMembers ?? ChatMembersPanel;

  const { archiveConversation } = useChatArchiveConversation();
  const { createConversation } = useChatCreateConversation();
  const { updateConversationMembers } = useChatUpdateConversationMembers();
  const { leaveConversation } = useChatLeaveConversation();

  const { setEditableConversation, resetEditableConversation } =
    useChatUpdateConversation();

  const { currentConversationId, selectConversation, currentConversation } =
    useChatCurrentConversation();

  const { screen, setScreen } = useChatScreen();

  const [editingTrigger, setEditingTrigger] =
    useState<EditingTriggerType | null>(null);

  useEffect(
    function handleConversationChanged() {
      if (!currentConversationId) {
        if (
          screen === ChatScreenEnum.CONVERSATION_SELECTED ||
          screen === ChatScreenEnum.CONVERSATION_ADD_MEMBERS ||
          screen === ChatScreenEnum.CONVERSATION_REMOVE_MEMBERS
        ) {
          setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
        }

        return;
      }

      resetEditableConversation();

      if (ChatScreenEnum.CONVERSATION_NOT_SELECTED) {
        setScreen(ChatScreenEnum.CONVERSATION_SELECTED);
      }
    },
    [currentConversationId, resetEditableConversation]
  );

  const unselectConversation = useCallback(() => {
    selectConversation(null);
  }, [selectConversation]);

  const handleArchiveConversationClick = useCallback(
    (conversationId) => {
      archiveConversation(conversationId);
      setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    },
    [setScreen, archiveConversation]
  );

  const handleGoToConversationAddMembersCLick = useCallback(
    (conversationId: string) => {
      selectConversation(conversationId);
      setScreen(ChatScreenEnum.CONVERSATION_ADD_MEMBERS);
    },
    [setScreen, selectConversation]
  );

  const handleLeaveConversation = useCallback(
    (conversationId: string) => {
      leaveConversation(conversationId);
    },
    [selectConversation, leaveConversation]
  );

  const handleGoToConversationRemoveMembersCLick = useCallback(
    (conversationId: string) => {
      selectConversation(conversationId);
      setScreen(ChatScreenEnum.CONVERSATION_REMOVE_MEMBERS);
    },
    [setScreen, selectConversation]
  );

  const handleRenameConversationClick = useCallback(
    (triggeredBy: EditingTriggerType) => (conversationId: string) => {
      setEditableConversation(conversationId);
      setEditingTrigger(triggeredBy);
    },
    [setEditableConversation, setEditingTrigger]
  );

  const handleActionButtonClick = useCallback(() => {
    setScreen(ChatScreenEnum.CREATE_NEW_CONVERSATION);
    unselectConversation();
  }, [setScreen, unselectConversation]);

  const handleCreateNewConversation = useCallback(
    (memberIds: string[]) => {
      const conversation: ChatCreateConversationRequestPayloadInterface = {
        title:
          memberIds.length > 1
            ? groupConverstionTitle ??
              t("chat.message-center.group-conversation-title")
            : conversationTitle ??
              t("chat.message-center.one-to-one-conversation-title"),
        memberIds,
      };

      createConversation(conversation);
      setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    },
    [createConversation, conversationTitle, groupConverstionTitle, t]
  );

  const handleCreateNewConversationCancel = useCallback(() => {
    setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    unselectConversation();
  }, [setScreen, unselectConversation]);

  const handleAddMembersCancel = useCallback(
    (conversationId) => {
      selectConversation(conversationId);
      setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    },
    [setScreen, selectConversation]
  );

  const handleAddMembers = useCallback(
    (memberIds: string[]) => {
      updateConversationMembers(memberIds);
      setScreen(ChatScreenEnum.CONVERSATION_SELECTED);
    },
    [setScreen, updateConversationMembers]
  );

  const handleRemoveMembersCancel = useCallback(
    (conversationId) => {
      selectConversation(conversationId);
      setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    },
    [setScreen, selectConversation]
  );

  const handleRemoveMembers = useCallback(
    (memberIds: string[]) => {
      updateConversationMembers(memberIds);
      setScreen(ChatScreenEnum.CONVERSATION_SELECTED);
    },
    [setScreen, updateConversationMembers]
  );

  const isConversationNotSelectedScreen = useMemo(
    () => screen === ChatScreenEnum.CONVERSATION_NOT_SELECTED,
    [screen]
  );

  const isConversationSelectedScreen = useMemo(
    () => screen === ChatScreenEnum.CONVERSATION_SELECTED,
    [screen]
  );

  const isCreateNewConversationScreen = useMemo(
    () => screen === ChatScreenEnum.CREATE_NEW_CONVERSATION,
    [screen]
  );

  const isConversationAddMembersSceen = useMemo(
    () => screen === ChatScreenEnum.CONVERSATION_ADD_MEMBERS,
    [screen]
  );

  const isConversationRemoveMembersSceen = useMemo(
    () => screen === ChatScreenEnum.CONVERSATION_REMOVE_MEMBERS,
    [screen]
  );

  const showSidebar = useMemo(
    () =>
      isCreateNewConversationScreen ||
      isConversationNotSelectedScreen ||
      isConversationSelectedScreen ||
      isConversationAddMembersSceen ||
      isConversationRemoveMembersSceen,
    [
      isCreateNewConversationScreen,
      isConversationNotSelectedScreen,
      isConversationSelectedScreen,
      isConversationAddMembersSceen,
      isConversationRemoveMembersSceen,
    ]
  );

  const renderConversationMenu = (trigger: EditingTriggerType) => (menuProps) =>
    (
      <ChatConversationMenu
        conversationId={currentConversationId}
        onArchive={handleArchiveConversationClick}
        onInvite={handleGoToConversationAddMembersCLick}
        onRemove={handleGoToConversationRemoveMembersCLick}
        onRename={handleRenameConversationClick(trigger)}
        onLeave={handleLeaveConversation}
        isOwner={currentConversation?.isOwner}
        {...menuProps}
      />
    );

  const currentConversationMemberIds = useMemo(
    () => currentConversation?.memberIds,
    [currentConversation]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Content className={clsx(_CLASS_IS + "__content", classNames?.content)}>
        {showSidebar && (
          <>
            <Sidebar
              title={title}
              onActionClick={handleActionButtonClick}
              className={clsx(
                _CLASS_IS + "__content__sidebar",
                classNames?.sidebar
              )}
            />

            {isConversationNotSelectedScreen && (
              <ConversationNotSelected
                className={clsx(
                  _CLASS_IS + "__content_chat",
                  classNames?.sidebar
                )}
                message={conversationNotSelectedMessage}
              />
            )}

            {isConversationSelectedScreen && (
              <ConversationSelected
                className={clsx(
                  _CLASS_IS + "__content__chat",
                  classNames?.sidebar
                )}
                components={{
                  ConversationMenu: renderConversationMenu("chat"),
                }}
              />
            )}

            {isConversationAddMembersSceen && (
              <AddMembers
                titleLabel={
                  addMemberTitle ?? t("chat.message-center.add-member")
                }
                className={clsx(_CLASS_IS + "__add-members", classNames?.panel)}
                onCancel={handleAddMembersCancel}
                onSubmit={handleAddMembers}
                initialSelectedIds={currentConversationMemberIds}
                initialFilter={{
                  excludeIds: currentConversationMemberIds,
                }}
              />
            )}

            {isConversationRemoveMembersSceen && (
              <RemoveMembers
                titleLabel={
                  removeMemberTitle ?? t("chat.message-center.remove-member")
                }
                className={clsx(
                  _CLASS_IS + "__remove-members",
                  classNames?.panel
                )}
                onCancel={handleRemoveMembersCancel}
                onSubmit={handleRemoveMembers}
                initialSelectedIds={currentConversationMemberIds}
                initialFilter={{
                  ids: currentConversationMemberIds,
                }}
              />
            )}
          </>
        )}

        {isCreateNewConversationScreen && (
          <CreateConversation
            className={clsx(
              _CLASS_IS + "__create-conversation",
              classNames?.panel
            )}
            onSubmit={handleCreateNewConversation}
            onCancel={handleCreateNewConversationCancel}
          />
        )}
      </Content>
    </Container>
  );
};
