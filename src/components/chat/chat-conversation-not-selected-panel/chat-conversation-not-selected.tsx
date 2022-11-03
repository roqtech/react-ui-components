import "./chat-conversation-not-selected-panel.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatMembers, ChatPanel } from "src/index";
import { ChatMembersProps } from "../chat-members/chat-members";
import { ChatUserInterface } from "src/interfaces";
import { ChatPanelPropsInterface } from "../chat-panel";

const _CLASS_IS =
  COMPONENT_CLASS_PREFIX + "chat-conversation-not-selected-panel";

export interface ChatConversationNotSelectedPanelPropsInterface {
  message?: string;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    message?: string;
  };
  components?: {
    Container: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Message: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
  };
}

export const ChatConversationNotSelectedPanel = (
  props: ChatConversationNotSelectedPanelPropsInterface
) => {
  const { style, className, classNames, components } = props;
  const { message = "Break the ice and start a conversation" } = props;

  const Container = components?.Container ?? ChatPanel;
  const Message = components?.Message ?? "h4";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Message className={clsx(_CLASS_IS + "__message", classNames?.message)}>
        {message}
      </Message>
    </Container>
  );
};
