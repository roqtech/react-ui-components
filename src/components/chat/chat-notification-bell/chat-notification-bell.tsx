import "./chat-notification-bell.scss";

import clsx from "classnames";
import React, { ComponentType, useMemo, CSSProperties } from "react";

import { Badge as DefaultBadge, BadgeProps } from "../../common/badge/badge";
import { MessagesIcon as DefaultIcon } from "./messages-icon";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatState } from "../chat-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-notification-bell";

export interface ChatNotificationBellProps {
  unreadCount: number;
  maxUnreadCount: number;
  displayZero?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    button?: string;
    icon?: string;
    badge?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Button: ComponentType<any>;
    Icon: ComponentType<{ className?: string }>;
    Badge: ComponentType<BadgeProps>;
  };
}

const ChatNotificationBell = (props: ChatNotificationBellProps) => {
  const { style, className, classNames, components } = props;

  const { unreadCount, maxUnreadCount = 10 } = props;

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
      style={style}
    >
      <Button className={clsx(_CLASS_IS + "__button", classNames?.button)}>
        <Badge
          className={clsx(_CLASS_IS + "__badge", classNames?.badge)}
          count={unreadCount}
          maxCount={maxUnreadCount}
        >
          <Icon
            className={clsx(_CLASS_IS + "__button__icon", classNames?.icon)}
          />
        </Badge>
      </Button>
    </Container>
  );
};

export default withChatState(({ unreadCount }) => ({
  unreadCount,
}))(ChatNotificationBell);
