import "./chat-link.scss";

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

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-link";

export interface ChatLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  ignoreClick?: boolean;
  style?: CSSProperties;
  className?: string;
  Component?: ComponentType<any>;
}

export const ChatLink = (props: ChatLinkProps) => {
  const { style, className, Component } = props;
  const {
    href,
    ignoreClick,
    target = "_blank",
    rel = "noreferrer",
    ...rest
  } = props;

  const Link = Component ?? "a";

  const handleClick = useCallback(
    (e) => {
      if (!ignoreClick) {
        return;
      }

      e.preventDefault();
    },
    [ignoreClick]
  );

  return (
    <Link
      className={clsx(_CLASS_IS, className)}
      style={style}
      href={href}
      onClick={handleClick}
      {...rest}
    >
      {href}
    </Link>
  );
};
