import "./message.scss";

import clsx from "classnames";
import React, { CSSProperties, ReactNode, ComponentType } from "react";

const _CLASS_IS = "roq-component-" + "message";

interface MessageProps {
  children: ReactNode;
  style?: CSSProperties;
  selected?: boolean;
  className?: string;
  classNames?: {
    container?: string;
  };
  components?: {
    Container: ComponentType<any>;
  };
}

export const Message = (props: MessageProps) => {
  const { children, style, className, classNames, components } = props;

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
