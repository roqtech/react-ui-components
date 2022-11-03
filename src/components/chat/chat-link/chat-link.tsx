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
import { ChatUserInterface } from "src/interfaces";
import { Badge, TimeAgo } from "src/components/common";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-link";

export interface ChatLinkPropsInterface
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  ignoreClick?: boolean;
  style?: CSSProperties;
  className?: string;
  Component?: ComponentType<
    Pick<
      AnchorHTMLAttributes<HTMLLinkElement>,
      "target" | "rel" | "className" | "style" | "href" | "onClick"
    >
  >;
}

export const ChatLink = (props: ChatLinkPropsInterface) => {
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
    (e: MouseEvent) => {
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
