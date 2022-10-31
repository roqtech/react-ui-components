import "./chat-conversation-header.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, useMemo } from "react";

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
import { ChatConversationInterface } from "src/types";
import isEmpty from "lodash/isEmpty";
import {
  ChatConversationMenu,
  ChatConversationMenuProps,
} from "../chat-conversation-menu";
import { ActionButton } from "src/components/common";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-header";

export interface ChatConversationHeaderProps
  extends Pick<ChatConversationInterface, "title" | "members"> {
  showActions?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    avatars?: string;
    info?: string;
    actions?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Avatars: ComponentType<AvatarGroupProps>;
    Info: ComponentType<StackedTextProps>;
    ConversationMenu?: ComponentType<ChatConversationMenuProps>;
  };
}

const ChatConversationHeader = (props: ChatConversationHeaderProps) => {
  const { style, className, classNames, components } = props;
  const { title, members, showActions = true } = props;

  const Container = components?.Container ?? "div";
  const Avatars = components?.Avatars ?? AvatarGroup;
  const Info = components?.Info ?? StackedText;

  const membersLine = useMemo(() => {
    if (isEmpty(members)) {
      return "";
    }

    return (
      `${members.length} members: ` +
      members.map(({ fullName }) => fullName).join(", ")
    );
  }, [members]);

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

export default withChatState<ChatConversationHeaderProps>(
  ({ currentConversation }) => ({
    currentConversation,
    title: currentConversation?.title ?? "",
    members: currentConversation?.members || [],
  })
)(ChatConversationHeader);
