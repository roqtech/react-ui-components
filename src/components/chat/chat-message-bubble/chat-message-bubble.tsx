import "./chat-message-bubble.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, ReactNode } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-bubble";

export interface ChatMessageBubbleProps {
  message: ReactNode | string;
  isSent?: boolean;
  showCorner?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    content?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Content: ComponentType<any>;
  };
}

export const ChatMessageBubble = (props: ChatMessageBubbleProps) => {
  const {
    isSent,
    showCorner,
    message,
    style,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.Container ?? "div";
  const Content = components?.Content ?? "p";

  return (
    <Container
      style={style}
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "-sent"]: isSent,
        [_CLASS_IS + "-received"]: !isSent,
        [_CLASS_IS + "-corner"]: showCorner,
      })}
    >
      <Content className={clsx(_CLASS_IS + "__content", classNames?.content)}>
        {message}
      </Content>
    </Container>
  );
};
