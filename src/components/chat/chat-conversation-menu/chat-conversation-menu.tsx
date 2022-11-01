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
  conversationId?: ChatConversationInterface["id"];
  isOwner?: boolean;
  showRename?: boolean;
  showArchive: boolean;
  showInvite: boolean;
  showRemove: boolean;
  showLeave: boolean;
  onRename?: (conversationId: string) => void;
  onArchive?: (conversationId: string) => void;
  onInvite?: (conversationId: string) => void;
  onRemove?: (conversationId: string) => void;
  onLeave?: (conversationId: string) => void;
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
    conversationId = null,
    isOwner,
    showRename = true,
    showArchive = true,
    showInvite = true,
    showRemove = true,
    showLeave = true,
    onClose,
    onRename,
    onArchive,
    onInvite,
    onRemove,
    onLeave,
    ...rest
  } = props;

  const Container = components?.Container ?? Menu;
  const Item = components?.Item ?? MenuItem;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleRenameClick = useCallback(() => {
    if (!conversationId) {
      return;
    }

    onRename?.(conversationId);
    onClose?.();
  }, [onRename, onClose, conversationId]);

  const handleArchiveClick = useCallback(() => {
    if (!conversationId) {
      return;
    }

    onArchive?.(conversationId);
    onClose?.();
  }, [onClose, onClose, conversationId]);

  const handleEditClick = useCallback(() => {
    if (!conversationId) {
      return;
    }

    onInvite?.(conversationId);
    onClose?.();
  }, [onClose, onClose, conversationId]);

  const handleRemoveClick = useCallback(() => {
    if (!conversationId) {
      return;
    }

    onRemove?.(conversationId);
    onClose?.();
  }, [onClose, onClose, conversationId]);

  const handleLeave = useCallback(() => {
    if (!conversationId) {
      return;
    }

    onLeave?.(conversationId);
    onClose?.();
  }, [onClose, onClose, conversationId]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      onClose={handleClose}
      {...rest}
    >
      {isOwner && showRename && (
        <Item onClick={handleRenameClick}>Rename group</Item>
      )}

      {isOwner && showArchive && (
        <Item onClick={handleArchiveClick}>Archive group</Item>
      )}

      {isOwner && showInvite && <Item onClick={handleEditClick}>Add user</Item>}

      {isOwner && showRemove && (
        <Item onClick={handleRemoveClick}>Remove user</Item>
      )}

      {!isOwner && showLeave && (
        <Item onClick={handleLeave}>Leave conversation</Item>
      )}
    </Container>
  );
};
