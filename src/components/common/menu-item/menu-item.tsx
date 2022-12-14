import "./menu-item.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "menu-item";

export interface MenuItemPropsInterface {
  onClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    Inner?: string;
  };
  components?: {
    Container: ComponentType<HTMLAttributes<HTMLElement>>;
    Inner: ComponentType<HTMLAttributes<HTMLElement>>;
  };
}

export const MenuItem = (props: MenuItemPropsInterface) => {
  const { style, className, classNames, components } = props;
  const { children, onClick } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onClick?.();
    },
    [onClick]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      onClick={handleClick}
    >
      {children}
    </Container>
  );
};
