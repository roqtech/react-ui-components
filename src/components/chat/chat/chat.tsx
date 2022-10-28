import "./chat.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  ReactNode,
  useEffect,
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

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat";

export interface ChatProps {
  children?: ReactNode;
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

export const Chat = (props: ChatProps) => {
  const { style, className, classNames, components } = props;
  const { children } = props;

  const Container = components?.Container ?? ChatPanel;
  const Header = components?.Header ?? ChatConversationHeader;
  const Messages = components?.Messages ?? ChatMessageList;
  const Input = components?.Input ?? ChatMessageInput;

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
      <Input className={clsx(_CLASS_IS + "__input", classNames?.container)} />
    </Container>
  );
};
