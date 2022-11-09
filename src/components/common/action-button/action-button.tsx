import "./action-button.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { DotsIcon as DefaultDotsIcon } from "./dots-icon";
import { Menu } from "src/index";
import { MenuPropsInterface } from "../menu";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "action-button";

export interface ActionButtonPropsInterface {
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    button?: string;
    icon?: string;
    dropdown?: string;
  };
  components?: {
    Container?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Button?: ComponentType<
      Pick<HTMLAttributes<HTMLButtonElement>, "onClick" | "className">
    >;
    Icon?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Dropdown?: ComponentType<
      Pick<MenuPropsInterface, "open" | "onClose" | "className">
    >;
  };
}

export const ActionButton = (props: ActionButtonPropsInterface) => {
  const { style, className, classNames, components } = props;

  const Container = components?.Container ?? "div";
  const Button = components?.Button ?? "button";
  const Icon = components?.Icon ?? DefaultDotsIcon;
  const Dropdown = components?.Dropdown ?? Menu;

  const [open, setOpen] = useState(false);

  const handleButtonClick = useCallback(
    (e) => {
      if (!open) {
        e.preventDefault();
        e.stopPropagation();
      }

      setOpen((_open) => !open);
    },
    [setOpen, open]
  );

  const handleDropdownClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--active"]: open,
      })}
      style={style}
    >
      <Button
        className={clsx(_CLASS_IS + "__button", classNames?.button)}
        onClick={handleButtonClick}
      >
        <Icon
          className={clsx(_CLASS_IS + "__button__icon", classNames?.icon)}
        />
      </Button>
      <Dropdown
        className={clsx(_CLASS_IS + "__dropdown", classNames?.dropdown)}
        open={open}
        onClose={handleDropdownClose}
      />
    </Container>
  );
};
