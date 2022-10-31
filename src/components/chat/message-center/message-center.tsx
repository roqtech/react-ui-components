import "./message-center.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  Chat,
  ChatConversationList,
  ChatConversationNotSelectedPanel,
  ChatMembersPanel,
  ChatPanel,
} from "src/index";
import { CreateConversationIcon as DefaultCreateConversationIcon } from "./create-conversation-icon";
import {
  ChatScreenEnum,
  useArchiveConversation,
  useChatScreen,
  useCreateConversation,
  useCurrentConversation,
} from "src/hooks";
import { MessageCenterScreenEnum } from "../types.work";
import { ChatConversationListProps } from "../chat-conversation-list";
import { ChatConversationMenu } from "../chat-conversation-menu";
import { ChatCreateConversationRequestPayloadInterface } from "src/utils/chat-socket.util";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "message-center";

export interface MessageCenterProps {
  title?: string;
  buttonLabel?: string;
  chatTitle?: string;
  groupChatTitle?: string;

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
    Container: ComponentType<any>;
    Header: ComponentType<any>;
    Title: ComponentType<any>;
    Button: ComponentType<any>;
    ButtonLabel: ComponentType<any>;
    ButtonIcon: ComponentType<any>;
    Content: ComponentType<any>;
    Sidebar: ComponentType<ChatConversationListProps>;
    Panel: ComponentType<any>;

    ConversationSelected: ComponentType<any>;
    ConversationNotSelected: ComponentType<any>;
    ConversationChat: ComponentType<any>;
    CreateConversation: ComponentType<any>;
    AddMembers: ComponentType<any>;
    RemoveMembers: ComponentType<any>;
  };
}

export const MessageCenter = (props: MessageCenterProps) => {
  const { style, className, classNames, components } = props;
  const {
    title = "Message Center",
    buttonLabel = "CREATE NEW CHAT",
    chatTitle = "Chat",
    groupChatTitle = "Group Chat",
  } = props;

  const Container = components?.Container ?? "div";
  const Header = components?.Header || "div";
  const Title = components?.Title || "h4";
  const Button = components?.Button ?? "button";
  const ButtonLabel = components?.ButtonLabel ?? "span";
  const ButtonIcon = components?.ButtonIcon ?? DefaultCreateConversationIcon;
  const Content = components?.Content || "div";

  const Sidebar = components?.Sidebar ?? ChatConversationList;

  const ConversationNotSelected =
    components?.ConversationNotSelected ?? ChatConversationNotSelectedPanel;

  const ConversationSelected = components?.ConversationSelected ?? Chat;

  const CreateConversation = components?.CreateConversation ?? ChatMembersPanel;
  const AddMembers = components?.AddMembers ?? ChatMembersPanel;
  const RemoveMembers = components?.RemoveMembers ?? ChatMembersPanel;

  const { currentConversationId, selectConversation } =
    useCurrentConversation();

  const { screen, setScreen } = useChatScreen({
    defaultScreen: ChatScreenEnum.CREATE_NEW_CONVERSATION,
  });

  useEffect(
    function handleConversationChanged() {
      if (!currentConversationId) {
        return;
      }

      setScreen(ChatScreenEnum.CONVERSATION_SELECTED);
    },
    [currentConversationId]
  );

  const { archiveConversation } = useArchiveConversation();
  const { createConversation } = useCreateConversation();

  const unselectConversation = useCallback(() => {
    selectConversation(null);
  }, [selectConversation]);

  const handleConversationClick = useCallback(
    (conversationId) => {
      selectConversation(conversationId);
      setScreen(ChatScreenEnum.CONVERSATION_SELECTED);
    },
    [selectConversation, setScreen]
  );

  const handleArchiveConversationClick = useCallback(
    (conversationId) => {
      archiveConversation(conversationId);
      setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    },
    [setScreen, archiveConversation]
  );

  const handleGoToConversationAddMembersCLick = useCallback(() => {
    alert("In progress..");
    setScreen(ChatScreenEnum.CONVERSATION_ADD_MEMBERS);
  }, [setScreen]);

  const handleGoToConversationRemoveMembersCLick = useCallback(() => {
    alert("In progress..");
    setScreen(ChatScreenEnum.CONVERSATION_REMOVE_MEMBERS);
  }, [setScreen]);

  const handleRenameConversationClick = useCallback(() => {
    alert("In progress..");
  }, []);

  const handleActionButtonClick = useCallback(() => {
    setScreen(ChatScreenEnum.CREATE_NEW_CONVERSATION);
    unselectConversation();
  }, [setScreen, unselectConversation]);

  const handleCreateNewConversation = useCallback(
    (memberIds: string[]) => {
      const conversation: ChatCreateConversationRequestPayloadInterface = {
        title: memberIds.length > 1 ? groupChatTitle : chatTitle,
        memberIds,
      };

      createConversation(conversation);
      setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    },
    [createConversation, chatTitle, groupChatTitle]
  );

  const handleCreateNewConversationCancel = useCallback(() => {
    setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    unselectConversation();
  }, [setScreen, unselectConversation]);

  const handleAddMembersCancel = useCallback(() => {
    setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    unselectConversation();
  }, [setScreen, unselectConversation]);

  const handleRemoveMembersCancel = useCallback(() => {
    setScreen(ChatScreenEnum.CONVERSATION_NOT_SELECTED);
    unselectConversation();
  }, [setScreen, unselectConversation]);

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
      isConversationNotSelectedScreen ||
      isConversationSelectedScreen ||
      isConversationAddMembersSceen ||
      isConversationRemoveMembersSceen,
    [isConversationNotSelectedScreen, isConversationSelectedScreen]
  );

  const renderConversationMenu = (menuProps) => (
    <ChatConversationMenu
      conversationId={currentConversationId}
      onArchive={handleArchiveConversationClick}
      onInvite={handleGoToConversationAddMembersCLick}
      onRemove={handleGoToConversationRemoveMembersCLick}
      onRename={handleRenameConversationClick}
      {...menuProps}
    />
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Header className={clsx(_CLASS_IS + "__header", classNames?.header)}>
        <Title
          className={clsx(_CLASS_IS + "__header__title", classNames?.title)}
        >
          {title}
        </Title>
        <Button
          className={clsx(_CLASS_IS + "__header__button", classNames?.button)}
          onClick={handleActionButtonClick}
        >
          <ButtonIcon className={clsx(_CLASS_IS + "__header__button__icon")} />
          {buttonLabel && (
            <ButtonLabel
              className={clsx(_CLASS_IS + "__header__button__label")}
            >
              {buttonLabel}
            </ButtonLabel>
          )}
        </Button>
      </Header>

      <Content className={clsx(_CLASS_IS + "__content", classNames?.content)}>
        {showSidebar && (
          <>
            <Sidebar
              className={clsx(
                _CLASS_IS + "__content__sidebar",
                classNames?.sidebar
              )}
              onConversationSelect={handleConversationClick}
              components={{
                ConversationMenu: renderConversationMenu,
              }}
            />

            {isConversationNotSelectedScreen && <ConversationNotSelected />}

            {isConversationSelectedScreen && (
              <ConversationSelected
                components={{
                  ConversationMenu: renderConversationMenu,
                }}
              />
            )}

            {isConversationAddMembersSceen && (
              <AddMembers
                className={clsx(_CLASS_IS + "__add-members", classNames?.panel)}
                onCancel={handleAddMembersCancel}
              />
            )}

            {isConversationRemoveMembersSceen && (
              <RemoveMembers
                className={clsx(
                  _CLASS_IS + "__remove-members",
                  classNames?.panel
                )}
                onCancel={handleRemoveMembersCancel}
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
