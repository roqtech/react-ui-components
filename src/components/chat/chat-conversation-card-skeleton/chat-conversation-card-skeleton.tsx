import "./chat-conversation-card-skeleton.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  ReactNode,
  HTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card-skeleton";

export interface ChatConversationCardSkeletonPropsInterface {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
  };
  components?: {
    Container?: ComponentType<
      Pick<HTMLAttributes<HTMLDivElement>, "style" | "className">
    >;
  };
}

export const ChatConversationCardSkeleton = (
  props: ChatConversationCardSkeletonPropsInterface
) => {
  const { style, className, classNames, components } = props;

  const Container = components?.Container ?? "div";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    />
  );
};
