import "./chat-message-history-line.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatMessageMenu, useRightClick } from "src/index";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-history-line";

export interface ChatMessageHistoryLineProps {
  messageId: string;
  isSent?: boolean;
  onRightClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    menu?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Menu: ComponentType<any>;
  };
}

export const ChatMessageHistoryLine = (props: ChatMessageHistoryLineProps) => {
  const { style, className, classNames, components, ...rest } = props;
  const { isSent, messageId, children, onRightClick } = props;

  const Container = components?.Container ?? "div";
  const Menu = components?.Menu ?? ChatMessageMenu;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  const handleRightClick = useCallback(() => {
    setMenuOpen(true);
    onRightClick?.();
  }, [onRightClick]);

  const { containerRef: ref } =
    useRightClick<HTMLSpanElement>(handleRightClick);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--sent"]: isSent,
        [_CLASS_IS + "--received"]: !isSent,
      })}
      style={style}
      ref={ref}
      {...rest}
    >
      {children}
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
