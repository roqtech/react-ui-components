import "./chat-panel.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-panel";

export interface ChatPanelPropsInterface {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
  };
  components?: {
    Container: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className" | "style" | "children">
    >;
  };
}

export const ChatPanel = (props: ChatPanelPropsInterface) => {
  const { style, className, classNames, components } = props;
  const { children } = props;

  const Container = components?.Container ?? "div";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {children}
    </Container>
  );
};
