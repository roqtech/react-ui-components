import "./chat-mention.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useMemo,
  ReactNode,
  HTMLAttributes,
  AnchorHTMLAttributes,
  useCallback,
} from "react";

import { AvatarGroup } from "../../common/avatar-group/avatar-group";
import { StackedText } from "../../common/stacked-text/stacked-text";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatUserInterface } from "src/types";
import { Badge, TimeAgo } from "src/components/common";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-mention";

export interface ChatMentionProps extends HTMLAttributes<HTMLSpanElement> {
  userId: string;
  name: string;
  style?: CSSProperties;
  className?: string;
  Component?: ComponentType<any>;
}

export const ChatMention = (props: ChatMentionProps) => {
  const { className, Component } = props;
  const { userId, name, ...rest } = props;

  const Mention = Component ?? "span";

  return (
    <Mention
      className={clsx(_CLASS_IS, className)}
      title={name}
      data-user-id={userId}
      {...rest}
    >
      @{name}
    </Mention>
  );
};
