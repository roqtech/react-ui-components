import "./chat-conversation-menu.scss";

import clsx from "classnames";
import React, { ComponentType, useCallback } from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatConversationInterface } from "src/interfaces";
import { Menu, MenuItem } from "src/components/common";
import { MenuPropsInterface } from "src/components/common/menu";
import { MenuItemPropsInterface } from "src/components/common/menu-item/menu-item";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-menu";

export interface ChatConversationMenuPropsInterface
  extends Omit<MenuPropsInterface, "classNames" | "components"> {
  conversationId?: ChatConversationInterface["id"];
  isOwner?: boolean;
  showRename?: boolean;
  showArchive: boolean;
  showInvite: boolean;
  showRemove: boolean;
  showLeave: boolean;
  renameLabel?: string;
  archiveLabel?: string;
  inviteLabel?: string;
  removeLabel?: string;
  leaveLabel?: string;
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
    Container?: ComponentType<
      Omit<MenuPropsInterface, "className" | "components">
    >;
    Item?: ComponentType<Pick<MenuItemPropsInterface, "onClick" | "children">>;
  };
}

export const ChatConversationMenu = (
  props: ChatConversationMenuPropsInterface
) => {
  const { t } = useRoqTranslation();
  const { className, classNames, components } = props;
  const {
    conversationId = null,
    isOwner,
    showRename = true,
    showArchive = true,
    showInvite = true,
    showRemove = true,
    showLeave = true,
    renameLabel,
    archiveLabel,
    inviteLabel,
    removeLabel,
    leaveLabel,
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
        <Item onClick={handleRenameClick}>
          {renameLabel ?? t("chat.conversation-menu.rename")}
        </Item>
      )}

      {isOwner && showArchive && (
        <Item onClick={handleArchiveClick}>
          {archiveLabel ?? t("chat.conversation-menu.archive")}
        </Item>
      )}

      {isOwner && showInvite && (
        <Item onClick={handleEditClick}>
          {inviteLabel ?? t("chat.conversation-menu.invite")}
        </Item>
      )}

      {isOwner && showRemove && (
        <Item onClick={handleRemoveClick}>
          {removeLabel ?? t("chat.conversation-menu.remove")}
        </Item>
      )}

      {!isOwner && showLeave && (
        <Item onClick={handleLeave}>
          {leaveLabel ?? t("chat.conversation-menu.leave")}
        </Item>
      )}
    </Container>
  );
};
