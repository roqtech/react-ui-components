import "./avatar-group.scss";

import clsx from "classnames";
import React, { ComponentType, useCallback, useMemo } from "react";

import { Avatar, AvatarProps } from "../avatar/avatar";

const _CLASS_IS = "roq-component-" + "avatar-group";

interface AvatarGroupProps<T extends Partial<AvatarProps>>
  extends Pick<AvatarProps, "size" | "rounded" | "square" | "border"> {
  data: T[];
  stack?: boolean;
  grid?: boolean;
  maxCount?: number;
  className?: string;
  classNames?: {
    container?: string;
    wrapper?: string;
    avatar?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Wrapper: ComponentType<any>;
    Avatar: ComponentType<AvatarProps>;
  };
}

const calculateItemWrapperZIndex = (index, total) => total - index;

export const AvatarGroup = <T extends Partial<AvatarProps>>(
  props: AvatarGroupProps<T>
) => {
  const {
    data,
    size,
    rounded,
    square,
    border,
    stack,
    grid,
    maxCount,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.Container ?? "div";
  const Wrapper = components?.Wrapper ?? "div";
  const AvatarComponent = components?.Avatar ?? Avatar;

  const avatarsData = useMemo(
    () => (maxCount ? data.slice(0, maxCount) : data),
    [data, maxCount]
  );

  const renderAvatar = useCallback(
    (avatarProps) => {
      return (
        <AvatarComponent
          size={size}
          rounded={rounded}
          square={square}
          border={border}
          className={classNames?.avatar}
          {...avatarProps}
        />
      );
    },
    [AvatarComponent, classNames?.avatar, size, rounded, square, border]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "-stack"]: stack,
        [_CLASS_IS + "-grid"]: grid,
      })}
    >
      {avatarsData.map((_p, i) => (
        <Wrapper
          key={i}
          className={clsx(_CLASS_IS + "__item", classNames?.wrapper)}
          style={{
            zIndex: calculateItemWrapperZIndex(i, avatarsData.length),
          }}
        >
          {renderAvatar(_p)}
        </Wrapper>
      ))}
    </Container>
  );
};
