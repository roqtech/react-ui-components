import "./action-button.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { DotsIcon as DefaultDotsIcon } from "./dots-icon";
import { Menu } from "src/index";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "action-button";

export interface ActionButtonProps {
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    button?: string;
    icon?: string;
    dropdown?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Button: ComponentType<any>;
    Icon: ComponentType<any>;
    Dropdown: ComponentType<any>;
  };
}

export const ActionButton = (props: ActionButtonProps) => {
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
