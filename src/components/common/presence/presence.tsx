import "./presence.scss";

import clsx from "classnames";
import React, { CSSProperties, HTMLAttributes } from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "presence";

export type PresenceSizeInterface = "small" | "medium" | "large";

export interface PresencePropsInterface {
  online?: boolean;
  size?: PresenceSizeInterface;
  style?: CSSProperties;
  className?: string;
  component: Pick<HTMLAttributes<HTMLElement>, "style" | "className">;
}

const presencerSizeToClassName = (size: PresenceSizeInterface) => {
  switch (size) {
    case "small":
    case "medium":
    case "large":
      return _CLASS_IS + `--size-${size}`;
  }
};

export const Presence = (props: PresencePropsInterface) => {
  const { style, className, ...rest } = props;

  const { online, size = "medium" } = rest;

  return (
    <div
      style={style}
      className={clsx(_CLASS_IS, className, presencerSizeToClassName(size), {
        [_CLASS_IS + "--online"]: online,
      })}
    />
  );
};
