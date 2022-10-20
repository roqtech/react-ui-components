import "./chat-notification-bell.scss";

import clsx from "classnames";
import React, { ComponentType, useMemo } from "react";

import { Badge as DefaultBadge, BadgeProps } from "../../common/badge/badge";
import { MessagesIcon as DefaultIcon } from "./messages-icon";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-notification-bell";

export interface ChatNotificationBellProps {
  unreadCount: number;
  maxUnreadCount: number;
  displayZero?: boolean;
  className?: string;
  classNames?: {
    container?: string;
    button?: string;
    icon?: string;
    badge?: string;
  };
  components?: {
    Container: ComponentType<any>
    Button: ComponentType<any>
    Icon: ComponentType<{ className?: string }>;
    Badge: ComponentType<BadgeProps>;
  };
}

export const ChatNotificationBell = (
  props: ChatNotificationBellProps
) => {
  const {
    unreadCount,
    maxUnreadCount = 10,
    displayZero,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.Container ?? "div";
  const Button = components?.Button ?? "button";
  const Icon = components?.Icon ?? DefaultIcon;
  const Badge = components?.Badge ?? DefaultBadge;

  const hasUnreadMessages = useMemo(() => unreadCount > 0, [unreadCount]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "-unread"]: hasUnreadMessages,
      })}
    >
      <Button className={clsx(_CLASS_IS + "__button", classNames?.button)}>
        <Icon
          className={clsx(_CLASS_IS + "__button__icon", classNames?.icon)}
        />
      </Button>
      <Badge
        className={clsx(_CLASS_IS + "__badge", classNames?.badge)}
        maxValue={maxUnreadCount}
      >
        {unreadCount}
      </Badge>
    </Container>
  );
};
