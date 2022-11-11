import "./chat-conversation-header.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useMemo,
} from "react";

import {
  AvatarGroup,
  AvatarGroupPropsInterface,
} from "../../common/avatar-group/avatar-group";
import {
  StackedText,
  StackedTextPropsInterface,
} from "../../common/stacked-text/stacked-text";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatState } from "../chat-provider";
import { ChatConversationInterface } from "src/interfaces";
import isEmpty from "lodash/isEmpty";
import { ActionButton } from "src/components/common";
import { ChatConversationMenuPropsInterface } from "../chat-conversation-menu/chat-conversation-menu";
import { AvatarSizeType } from "src/components/common/avatar/avatar";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-header";

export interface ChatConversationHeaderPropsInterface
  extends Pick<ChatConversationInterface, "title" | "members" | "isGroup"> {
  showActions?: boolean;
  formatMembers: (members: ChatConversationInterface["members"]) => ReactNode;
  oneToOneChatAvatarSize?: AvatarSizeType;
  groupChatAvatarSize?: AvatarSizeType;

  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    avatars?: string;
    info?: string;
    actions?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
    Avatars?: ComponentType<
      Pick<
        AvatarGroupPropsInterface,
        "users" | "maxCount" | "size" | "className"
      >
    >;
    Info?: ComponentType<
      Pick<
        StackedTextPropsInterface,
        "primaryText" | "secondaryText" | "classNames"
      >
    >;
    ConversationMenu?: ComponentType<
      Pick<ChatConversationMenuPropsInterface, "className" | "open" | "onClose">
    >;
  };
}

const defaultFormatMembers = (
  members: ChatConversationInterface["members"]
): ReactNode => {
  if (isEmpty(members)) {
    return "";
  }

  return (
    `${members.length} members: ` +
    members.map(({ fullName }) => fullName).join(", ")
  );
};

const ChatConversationHeader = (
  props: ChatConversationHeaderPropsInterface
) => {
  const { style, className, classNames, components, ...rest } = props;
  const {
    title,
    members,
    showActions = true,
    formatMembers = defaultFormatMembers,
    isGroup,
    oneToOneChatAvatarSize = "extra-large",
    groupChatAvatarSize = "large",
  } = rest;

  const Container = components?.Container ?? "div";
  const Preview = components?.Preview ?? "div";
  const Avatars = components?.Avatars ?? AvatarGroup;
  const Info = components?.Info ?? StackedText;

  const membersLine = useMemo(
    () => formatMembers(members),
    [members, formatMembers]
  );

  const avatarSize = useMemo(
    () => (isGroup ? groupChatAvatarSize : oneToOneChatAvatarSize),
    [isGroup, oneToOneChatAvatarSize, groupChatAvatarSize]
  );

  const avatarMaxCount = useMemo(() => (isGroup ? 2 : 1), [isGroup]);

  const avatarUsers = useMemo(
    () => (isGroup ? members : [members[0]]),
    [isGroup, members]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Preview  className={clsx(_CLASS_IS + "__preview", classNames?.preview)}>
        <Avatars
          users={avatarUsers}
          maxCount={avatarMaxCount}
          size={avatarSize}
          className={clsx(_CLASS_IS + "__preview__avatars", classNames?.avatars)}
        />
      </Preview>
      <Info
        primaryText={title}
        secondaryText={membersLine}
        classNames={{
          container: clsx(_CLASS_IS + "__info", classNames?.info),
          primaryText: clsx(_CLASS_IS + "__info__name"),
          secondaryText: clsx(_CLASS_IS + "__info__members"),
        }}
      />
      {showActions && (
        <ActionButton
          className={clsx(_CLASS_IS + "__actions", classNames?.actions)}
          components={{
            ...(components?.ConversationMenu && {
              Dropdown: components?.ConversationMenu,
            }),
          }}
        />
      )}
    </Container>
  );
};

export default withChatState<
  ChatConversationHeaderPropsInterface,
  "title" | "members" | "isGroup"
>(({ currentConversation }) => ({
  title: currentConversation?.title ?? "",
  members: currentConversation?.members || [],
  isGroup: currentConversation?.isGroup ?? false,
}))(ChatConversationHeader);
