import "./chat-conversation-header.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, ReactNode, useMemo } from "react";

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

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-header";

export interface ChatConversationHeaderPropsInterface
  extends Pick<ChatConversationInterface, "title" | "members"> {
  showActions?: boolean;
  formatMembers: (members: ChatConversationInterface["members"]) => ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    avatars?: string;
    info?: string;
    actions?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    Avatars?: ComponentType<AvatarGroupPropsInterface>;
    Info?: ComponentType<
      Pick<
        StackedTextPropsInterface,
        "primaryText" | "secondaryText" | "classNames"
      >
    >;
    ConversationMenu?: ComponentType<ChatConversationMenuPropsInterface>;
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
  const { style, className, classNames, components } = props;
  const {
    title,
    members,
    showActions = true,
    formatMembers = defaultFormatMembers,
  } = props;

  const Container = components?.Container ?? "div";
  const Avatars = components?.Avatars ?? AvatarGroup;
  const Info = components?.Info ?? StackedText;

  const membersLine = useMemo(
    () => formatMembers(members),
    [members, formatMembers]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Avatars
        users={members}
        maxCount={3}
        size="large"
        className={clsx(_CLASS_IS + "__avatars", classNames?.avatars)}
      />
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
            Dropdown: components?.ConversationMenu,
          }}
        />
      )}
    </Container>
  );
};

export default withChatState<ChatConversationHeaderPropsInterface>(
  ({ currentConversation }) => ({
    title: currentConversation?.title ?? "",
    members: currentConversation?.members || [],
  })
)(ChatConversationHeader);
