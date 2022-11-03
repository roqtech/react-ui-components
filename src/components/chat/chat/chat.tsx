import "./chat.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  createRef,
  CSSProperties,
  useCallback,
  useEffect,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatPanel,
  ChatConversationHeader,
  ChatMessageList,
  ChatMessageInput,
} from "src/index";
import Editor from "@draft-js-plugins/editor/lib/Editor";
import { ChatConversationMenuPropsInterface } from "../chat-conversation-menu";
import { ChatConversationHeaderPropsInterface } from "../chat-conversation-header";
import { ChatPanelPropsInterface } from "../chat-panel";
import { withChatState } from "../chat-provider";
import { ChatMessageInputProps } from "../chat-message-input";
import { ChatMessageListProps } from "../chat-message-list";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat";

export interface ChatPropsInterface {
  test?: string;
  conversationId?: string | null;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    messages?: string;
    input?: string;
  };
  components?: {
    Container?: ComponentType<Pick<ChatPanelPropsInterface, "className" | "style">>;
    Header?: ComponentType<
      Pick<ChatConversationHeaderPropsInterface, "className" | "components">
    >;
    Messages?: ComponentType<Pick<ChatMessageListProps, "className">>;
    Input?: ComponentType<
      Pick<ChatMessageInputProps, "className" | "textareaRef">
    >;
    ConversationMenu?: ComponentType<ChatConversationMenuPropsInterface>;
  };
}

const Chat = (props: ChatPropsInterface) => {
  const { style, className, classNames, components } = props;
  const { conversationId } = props;

  const Container = components?.Container ?? ChatPanel;
  const Header = components?.Header ?? ChatConversationHeader;
  const Messages = components?.Messages ?? ChatMessageList;
  const Input = components?.Input ?? ChatMessageInput;

  const textareaRef = createRef<Editor>();

  const focusInput = useCallback(() => {
    if (!textareaRef) {
      return;
    }

    textareaRef.current?.focus();
  }, [textareaRef]);

  useEffect(
    function handleConversationIdChanged() {
      if (!conversationId) {
        return;
      }

      focusInput();
    },
    [conversationId]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Header
        className={clsx(_CLASS_IS + "__header", classNames?.container)}
        components={{
          ConversationMenu: components?.ConversationMenu,
        }}
      />
      <Messages
        className={clsx(_CLASS_IS + "__messages", classNames?.container)}
      />
      <Input
        className={clsx(_CLASS_IS + "__input", classNames?.container)}
        textareaRef={textareaRef}
      />
    </Container>
  );
};

export default withChatState<ChatPropsInterface>(
  ({ currentConversationId }) => ({
    conversationId: currentConversationId,
  })
)(Chat);
