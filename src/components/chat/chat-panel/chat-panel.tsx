import "./chat-panel.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, ReactNode } from "react";

import {
  AvatarGroup,
  AvatarGroupProps,
} from "../../common/avatar-group/avatar-group";
import {
  StackedText,
  StackedTextProps,
} from "../../common/stacked-text/stacked-text";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatState } from "../chat-provider";
import { ChatConversationInterface } from "src/types";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-panel";

export interface ChatPanelProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
  };
  components?: {
    Container: ComponentType<any>;
  };
}

export const ChatPanel = (props: ChatPanelProps) => {
  const { style, className, classNames, components } = props;
  const { children } = props;

  const Container = components?.Container ?? "div";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {children}
    </Container>
  );
};
