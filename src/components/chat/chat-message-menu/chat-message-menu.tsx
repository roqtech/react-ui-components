import "./chat-message-menu.scss";

import clsx from "classnames";
import React, { ComponentType, useCallback } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatApi } from "../chat-provider";
import { ChatMessageInterface } from "src/interfaces";
import { Menu, MenuItem } from "src";
import { MenuItemPropsInterface } from "src/components/common/menu-item/menu-item";
import { MenuPropsInterface } from "src/components/common/menu";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-menu";

export interface ChatMessageMenuPropsInterface
  extends Omit<MenuPropsInterface, "classNames" | "components"> {
  isAuthor?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  messageId: ChatMessageInterface["id"];
  onClose?: () => void;
  onEdit?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  classNames?: {
    container?: string;
    item?: string;
  };
  components?: {
    Container?: ComponentType<
      Omit<MenuPropsInterface, "classNames" | "components">
    >;
    Item: ComponentType<Pick<MenuItemPropsInterface, "onClick" | "children">>;
  };
}

export const ChatMessageMenu = (props: ChatMessageMenuPropsInterface) => {
  const { className, classNames, components, ...args } = props;
  const {
    isAuthor,
    showEdit = true,
    showDelete = true,
    messageId,
    onClose,
    onEdit,
    onDelete,
    ...rest
  } = args;

  const Container = components?.Container ?? Menu;
  const Item = components?.Item ?? MenuItem;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleEditClick = useCallback(() => {
    onEdit?.(messageId);
    onClose?.();
  }, [onEdit, onClose, messageId]);

  const handleDeleteClick = useCallback(() => {
    onDelete?.(messageId);
    onClose?.();
  }, [onDelete, onClose, messageId]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      onClose={handleClose}
      {...rest}
    >
      {isAuthor && showEdit && <Item onClick={handleEditClick}>Edit</Item>}
      {isAuthor && showDelete && (
        <Item onClick={handleDeleteClick}>Delete</Item>
      )}
    </Container>
  );
};

export default withChatApi((api) => ({
  onDelete: api.deleteMessage,
  onEdit: api.setEditableMessage,
}))(ChatMessageMenu);
