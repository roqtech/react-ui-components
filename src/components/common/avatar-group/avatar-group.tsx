import "./avatar-group.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  HTMLAttributes,
  useCallback,
  useMemo,
} from "react";

import {
  Avatar as RoqAvatar,
  AvatarPropsInterface,
  avatarSizeToClassName,
  AvatarSizeType,
} from "../avatar/avatar";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatUserInterface } from "src/interfaces";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "avatar-group";

export interface AvatarGroupPropsInterface
  extends Pick<AvatarPropsInterface, "rounded" | "square" | "border"> {
  size: AvatarSizeType;
  users: ChatUserInterface[];
  maxCount?: number;
  displayTotal?: boolean;
  className?: string;
  classNames?: {
    container?: string;
    wrapper?: string;
    total?: string;
    avatar?: string;
  };
  components?: {
    Container: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Wrapper: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className" | "style">
    >;
    Avatar: ComponentType<AvatarPropsInterface>;
    Total: ComponentType<
      Pick<AvatarPropsInterface, "className" | "style" | "initials">
    >;
  };
}

const calculateItemWrapperZIndex = (index, total) => index;

const downgradeAvatarSize = (size: AvatarSizeType): AvatarSizeType => {
  switch (size) {
    case "extra-large":
      return "large";

    case "large":
      return "medium";

    case "medium":
      return "small";

    case "small":
      return "extra-small";

    case "extra-small":
      return "tiny";

    case "tiny":
    default:
      return "tiny";
  }
};

export const AvatarGroup = (props: AvatarGroupPropsInterface) => {
  const { className, classNames, components, ...rest } = props;

  const {
    users,
    size = "medium",
    rounded,
    square,
    border,
    maxCount = 2,
    displayTotal = true,
  } = rest;

  const Container = components?.Container ?? "div";
  const Wrapper = components?.Wrapper ?? "div";
  const Avatar = components?.Avatar ?? RoqAvatar;
  const Total = components?.Total ?? RoqAvatar;

  const usersData = useMemo(
    () => (maxCount ? (users ?? []).slice(0, maxCount) : users),
    [users, maxCount]
  );

  const hiddenCount = useMemo(
    () => users.length - usersData.length,
    [users, usersData]
  );

  const showTotal = useMemo(
    () => (displayTotal ? hiddenCount > 0 : false),
    [hiddenCount, displayTotal]
  );

  const avatarSize = useMemo(
    () => (showTotal ? downgradeAvatarSize(size) : size),
    [showTotal, size]
  );

  const totalSize = useMemo(
    () => downgradeAvatarSize(downgradeAvatarSize(avatarSize)),
    [avatarSize]
  );

  const renderAvatar = useCallback(
    ({ avatar, ...avatarProps }: Partial<ChatUserInterface>) => {
      return (
        <Avatar
          size={avatarSize}
          rounded={rounded}
          square={square}
          border={border}
          className={classNames?.avatar}
          src={avatar}
          {...avatarProps}
        />
      );
    },
    [Avatar, classNames?.avatar, avatarSize, rounded, square, border]
  );

  return (
    <Container
      className={clsx(
        _CLASS_IS,
        className,
        classNames?.container,
        avatarSizeToClassName(_CLASS_IS, size),
        {
          [_CLASS_IS + "--stack"]: users.length > 1,
        }
      )}
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
      {showTotal && (
        <Total
          className={clsx(_CLASS_IS + "__item", classNames?.total, {
            [_CLASS_IS + "__item" + "--total"]: true,
          })}
          style={{
            zIndex: calculateItemWrapperZIndex(
              usersData.length,
              usersData.length
            ),
          }}
          size={totalSize}
          initials={`${hiddenCount}`}
        />
      )}
    </Container>
  );
};
