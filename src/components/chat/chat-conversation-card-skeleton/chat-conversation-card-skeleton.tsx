import "./chat-conversation-card-skeleton.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  ReactNode,
  HTMLAttributes,
  Ref,
  forwardRef,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card-skeleton";

export interface ChatConversationCardSkeletonPropsInterface {
  innerRef?: Ref<ChatConversationCardSkeletonPropsInterface>;
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

const ChatConversationCardSkeleton = (
  props: ChatConversationCardSkeletonPropsInterface
) => {
  const { style, className, classNames, components, innerRef } = props;

  const Container = components?.Container ?? "div";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      ref={innerRef}
    />
  );
};

export default forwardRef<ChatConversationCardSkeletonPropsInterface>(
  (props, ref) => <ChatConversationCardSkeleton {...props} innerRef={ref} />
);
