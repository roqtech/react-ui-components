import "./chat-message-menu.scss";

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
import { withChatApi, withChatState } from "../chat-provider";
import { ChatConversationInterface, ChatMessageInterface } from "src/types";
import isEmpty from "lodash/isEmpty";
import { Menu, MenuItem } from "src";
import { MenuProps } from "src/components/common/menu";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-menu";

export interface ChatMessageMenuProps
  extends Omit<MenuProps, "classNames" | "components"> {
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
    Container: ComponentType<any>;
    Item: ComponentType<any>;
  };
}

export const ChatMessageMenu = (props: ChatMessageMenuProps) => {
  const { className, classNames, components } = props;
  const {
    isAuthor,
    showEdit = true,
    showDelete = true,
    messageId,
    onClose,
    onEdit,
    onDelete,
    ...rest
  } = props;

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
