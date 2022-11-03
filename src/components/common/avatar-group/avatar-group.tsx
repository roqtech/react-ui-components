import "./avatar-group.scss";

import clsx from "classnames";
import React, { ComponentType, HTMLAttributes, useCallback, useMemo } from "react";

import { Avatar, AvatarProps } from "../avatar/avatar";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatUserInterface } from "src/interfaces";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "avatar-group";

export interface AvatarGroupPropsInterface
  extends Pick<AvatarProps, "size" | "rounded" | "square" | "border"> {
  users: ChatUserInterface[];
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
    Container: ComponentType<HTMLAttributes<HTMLElement>>;
    Wrapper: ComponentType<any>;
    Avatar: ComponentType<AvatarProps>;
  };
}

const calculateItemWrapperZIndex = (index, total) => total - index;

export const AvatarGroup = (props: AvatarGroupPropsInterface) => {
  const {
    users,
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

  const usersData = useMemo(
    () => (maxCount ? (users ?? []).slice(0, maxCount) : users),
    [users, maxCount]
  );

  const hiddenCount = useMemo(
    () => users.length - usersData.length,
    [users, usersData]
  );

  const showHidden = useMemo(() => hiddenCount > 0, [hiddenCount]);

  const renderAvatar = useCallback(
    ({ avatar, ...avatarProps }: Partial<ChatUserInterface>) => {
      return (
        <AvatarComponent
          size={size}
          rounded={rounded}
          square={square}
          border={border}
          className={classNames?.avatar}
          src={avatar}
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
      {usersData.map((_p, i) => (
        <Wrapper
          key={i}
          className={clsx(_CLASS_IS + "__item", classNames?.wrapper)}
          style={{
            zIndex: calculateItemWrapperZIndex(i, usersData.length),
          }}
        >
          {renderAvatar(_p)}
        </Wrapper>
      ))}
      {showHidden && (
        <Wrapper
          className={clsx(_CLASS_IS + "__item", classNames?.wrapper)}
          style={{
            zIndex: calculateItemWrapperZIndex(
              usersData.length,
              usersData.length
            ),
          }}
        >
          {renderAvatar({ initials: `+${hiddenCount}` })}
        </Wrapper>
      )}
    </Container>
  );
};
