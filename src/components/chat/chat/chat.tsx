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
  ChatConversationHeader,
  ChatMessageList,
  ChatMessageInput,
  Panel,
} from "src/index";
import Editor from "@draft-js-plugins/editor/lib/Editor";
import { ChatConversationMenuPropsInterface } from "../chat-conversation-menu";
import { ChatConversationHeaderPropsInterface } from "../chat-conversation-header";
import { withChatState } from "../chat-provider";
import { ChatMessageInputPropsInterface } from "../chat-message-input";
import { ChatMessageListPropsInterface } from "../chat-message-list";
import { PanelPropsInterface } from "src/components/common";

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
    Container?: ComponentType<Pick<PanelPropsInterface, "className" | "style">>;
    Header?: ComponentType<
      Pick<ChatConversationHeaderPropsInterface, "className" | "components">
    >;
    Messages?: ComponentType<Pick<ChatMessageListPropsInterface, "className">>;
    Input?: ComponentType<
      Pick<ChatMessageInputPropsInterface, "className" | "textareaRef">
    >;
    ConversationMenu?: Pick<
      ChatConversationMenuPropsInterface,
      "className" | "open" | "onClose"
    >;
  };
}

const Chat = (props: ChatPropsInterface) => {
  const { style, className, classNames, components } = props;
  const { conversationId } = props;

  const Container = components?.Container ?? Panel;
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
          ...(components?.ConversationMenu && {
            ConversationMenu: components?.ConversationMenu,
          }),
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

export default withChatState<ChatPropsInterface, "conversationId">(
  ({ currentConversationId }) => ({
    conversationId: currentConversationId,
  })
)(Chat);
