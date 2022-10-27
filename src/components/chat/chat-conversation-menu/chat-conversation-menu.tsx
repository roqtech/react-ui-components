import "./chat-conversation-menu.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  useCallback,
  useMemo,
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
import { withChatState } from "../chat-provider";
import { ChatConversationInterface, ChatMessageInterface } from "src/types";
import isEmpty from "lodash/isEmpty";
import { Menu, MenuItem } from "src/components/common";
import { MenuProps } from "src/components/common/menu";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-menu";

export interface ChatConversationMenuProps
  extends Omit<MenuProps, "classNames" | "components"> {
  conversationId: ChatConversationInterface["id"];
  onRename?: (conversationId: string) => void;
  onArchive?: (conversationId: string) => void;
  onInvite?: (conversationId: string) => void;
  onRemove?: (conversationId: string) => void;
  classNames?: {
    container?: string;
    item?: string;
    info?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Item: ComponentType<any>;
  };
}

export const ChatConversationMenu = (props: ChatConversationMenuProps) => {
  const { className, classNames, components } = props;
  const {
    conversationId,
    onClose,
    onRename,
    onArchive,
    onInvite,
    onRemove,
    ...rest
  } = props;

  const Container = components?.Container ?? Menu;
  const Item = components?.Item ?? MenuItem;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleRenameClick = useCallback(() => {
    onRename?.(conversationId);
    onClose?.();
  }, [onRename, onClose, conversationId]);

  const handleArchiveClick = useCallback(() => {
    onArchive?.(conversationId);
    onClose?.();
  }, [onClose, onClose, conversationId]);

  const handleEditClick = useCallback(() => {
    onInvite?.(conversationId);
    onClose?.();
  }, [onClose, onClose, conversationId]);

  const handleRemoveClick = useCallback(() => {
    onRemove?.(conversationId);
    onClose?.();
  }, [onClose, onClose, conversationId]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      onClose={handleClose}
      {...rest}
    >
      <Item onClick={handleRenameClick}>Rename group</Item>
      <Item onClick={handleArchiveClick}>Archive group</Item>
      <Item onClick={handleEditClick}>Add user</Item>
      <Item onClick={handleRemoveClick}>Remove user</Item>
    </Container>
  );
};
