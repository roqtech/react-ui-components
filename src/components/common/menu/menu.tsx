import "./menu.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { useClickOutside } from "src/index";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "menu";

export interface MenuPropsInterface {
  open?: boolean;
  onClose?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    list?: string;
  };
  components?: {
    Container: ComponentType<HTMLAttributes<HTMLElement>>;
    List: ComponentType<HTMLAttributes<HTMLElement>>;
  };
}

export const Menu = (props: MenuPropsInterface) => {
  const { style, className, classNames, components } = props;
  const { children, onClose, open } = props;

  const Container = components?.Container ?? "div";
  const List = components?.List ?? "div";

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const { containerRef: ref } = useClickOutside<HTMLDivElement>(handleClose);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--open"]: open,
      })}
      style={style}
      ref={ref}
    >
      <List className={clsx(_CLASS_IS + "__items", classNames?.container)}>
        {children}
      </List>
    </Container>
  );
};
