import "./chat-date-seperator.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useMemo,
  HTMLAttributes,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatMessageBubble,
  ChatMessageBubblePropsInterface,
} from "../chat-message-bubble";
import { Avatar, TimeAgo } from "src/components/common";
import { ChatMessageInterface, ChatUserInterface } from "src/interfaces";
import { ChatFormattedMessage } from "src/index";
import { ChatFormattedMessagePropsInterface } from "../chat-formatted-message";
import { TimeAgoPropsInterface } from "src/components/common/time-ago/time-ago";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-date-seperator";

export interface ChatDateSeparatorPropsInterface
  extends Pick<TimeAgoPropsInterface, "timestamp" | "format"> {
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    time?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
    Time?: ComponentType<
      Pick<TimeAgoPropsInterface, "timestamp" | "format" | "className">
    >;
  };
}

export const ChatDateSeparator = (props: ChatDateSeparatorPropsInterface) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components, ...rest } = props;
  const { timestamp, format } = rest;

  const Container = components?.Container ?? "div";
  const Time = components?.Time ?? TimeAgo;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Time
        timestamp={timestamp}
        format={format}
        className={clsx(_CLASS_IS + "__time", classNames?.time)}
      />
    </Container>
  );
};
