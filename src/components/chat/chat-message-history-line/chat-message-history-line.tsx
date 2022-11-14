import "./chat-message-history-line.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatMessageMenu,
  useRightClick,
  ChatDateSeparator,
  ChatDateSeparatorPropsInterface,
} from "src/index";
import { ChatMessageMenuPropsInterface } from "../chat-message-menu";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-history-line";

export interface ChatMessageHistoryLinePropsInterface {
  messageId: string;
  isSent?: boolean;
  timestamp: ChatDateSeparatorPropsInterface["timestamp"];
  showDateSeparator?: boolean;
  onRightClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    menu?: string;
  };
  components?: {
    Container: ComponentType<HTMLAttributes<HTMLElement>>;
    Menu: ComponentType<
      Pick<
        ChatMessageMenuPropsInterface,
        "className" | "open" | "onClose" | "messageId" | "isAuthor"
      >
    >;
  };
}

export const ChatMessageHistoryLine = (
  props: ChatMessageHistoryLinePropsInterface
) => {
  const { style, className, classNames, components, ...rest } = props;
  const {
    isSent,
    messageId,
    children,
    onRightClick,
    showDateSeparator,
    timestamp,
    ...containerProps
  } = rest;

  const Container = components?.Container ?? "div";
  const Before = components?.Before ?? "div";
  const Content = components?.Content ?? "div";
  const After = components?.After ?? "div";
  const Separator = components?.Separator ?? ChatDateSeparator;
  const Menu = components?.Menu ?? ChatMessageMenu;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  const handleRightClick = useCallback(() => {
    setMenuOpen(true);
    onRightClick?.();
  }, [onRightClick]);

  const { containerRef: ref } = useRightClick<HTMLDivElement>(handleRightClick);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--sent"]: isSent,
        [_CLASS_IS + "--received"]: !isSent,
      })}
      style={style}
      {...containerProps}
    >
      {showDateSeparator && (
        <Before className={clsx(_CLASS_IS + "__before", classNames?.before)}>
          <Separator
            timestamp={timestamp}
            className={clsx(
              _CLASS_IS + "__before__separator",
              classNames?.separator
            )}
          />
        </Before>
      )}
      <Content
        className={clsx(_CLASS_IS + "__content", classNames?.content)}
        ref={ref}
      >
        {children}
      </Content>
      <After className={clsx(_CLASS_IS + "__after", classNames?.after)} />
      <Menu
        className={clsx(_CLASS_IS + "__menu", classNames?.menu)}
        open={menuOpen}
        onClose={handleMenuClose}
        messageId={messageId}
        isAuthor={isSent}
      />
    </Container>
  );
};
