import "./chat.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  createRef,
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  AvatarGroup,
  AvatarGroupProps,
} from "../../common/avatar-group/avatar-group";
import {
  StackedText,
  StackedTextProps,
} from "../../common/stacked-text/stacked-text";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatPanel,
  ChatConversationHeader,
  ChatMessageList,
  ChatMessageInput,
} from "src/index";
import { withChatState } from "../chat-provider";
import Editor from "@draft-js-plugins/editor/lib/Editor";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat";

export interface ChatProps {
  conversationId: string;
  showEditingForm?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    messages?: string;
    input?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Header: ComponentType<any>;
    Messages: ComponentType<any>;
    Input: ComponentType<any>;
    ConversationMenu: ComponentType<any>;
  };
}

const Chat = (props: ChatProps) => {
  const { style, className, classNames, components } = props;
  const { conversationId, showEditingForm } = props;

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
        showEditingForm={showEditingForm}
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

export default withChatState(({ currentConversationId }) => ({
  conversationId: currentConversationId,
}))(Chat);
