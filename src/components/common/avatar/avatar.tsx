import "./avatar.scss";

import clsx from "classnames";
import isEmpty from "lodash/isEmpty";
import React, { CSSProperties } from "react";

import { DefaultImage } from "./default-image";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "avatar";

export type AvatarSizeType =
  | "tiny"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

export interface AvatarPropsInterface {
  name?: string;
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSizeType;
  rounded?: boolean;
  square?: boolean;
  border?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    initials?: string;
    image?: string;
  };
}

export const avatarSizeToClassName = (prefix: string, size: AvatarSizeType) => {
  switch (size) {
    case "tiny":
    case "extra-small":
    case "small":
    case "medium":
    case "large":
    case "extra-large":
      return prefix + `--size-${size}`;
  }
};

const getInitials = (initials: string): string =>
  initials
    .replace(/\s\s+/g, " ")
    .split(" ")
    .reduce((acc, val) => acc + val.charAt(0), "");

export const Avatar = (props: AvatarPropsInterface) => {
  const {
    name,
    src,
    alt,
    initials,
    size = "medium",
    rounded = true,
    square,
    border = true,
    style,
    className,
    classNames,
  } = props;

  const abbr = src ? null : name ? getInitials(name) : initials;

  const isDefault = isEmpty(name) && isEmpty(src) && isEmpty(abbr);

  const content = abbr ? (
    <span className={clsx(_CLASS_IS + "__initials", classNames?.initials)}>
      {abbr}
    </span>
  ) : (
    <img
      src={src}
      alt={alt}
      className={clsx(_CLASS_IS + "__image", classNames?.image)}
    />
  );

  return (
    <div
      style={style}
      className={clsx(
        _CLASS_IS,
        className,
        classNames?.container,
        avatarSizeToClassName(_CLASS_IS, size),
        {
          [_CLASS_IS + "--rounded"]: rounded,
          [_CLASS_IS + "--square"]: square,
          [_CLASS_IS + "--border"]: border,
          [_CLASS_IS + "--initials"]: !!abbr,
        }
      )}
    >
      {isDefault ? (
        <span
          className={clsx(
            _CLASS_IS + "__image",
            classNames?.image,
            _CLASS_IS + "__image-default"
          )}
        >
          <DefaultImage />
        </span>
      ) : (
        content
      )}
    </div>
  );
};
