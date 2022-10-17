import './avatar-group.css';

import clsx from 'classnames';
import React, { Element, useCallback, useMemo } from 'react';

import { Avatar, AvatarProps } from '../avatar/avatar';

const _CLASS_IS = 'roq-widget-' + 'avatar-group';

interface AvatarGroupProps<T extends Partial<AvatarProps>>
  extends Pick<'size' | 'rounded' | 'square' | 'border', AvatarProps> {
  data: T[];
  stack?: boolean;
  grid?: boolean;
  maxCount?: number;
  className?: string;
  classNames?: {
    container?: string;
    itemWrapper?: string;
  };
  components?: {
    container: Element;
    itemWrapper: Element;
    avatar: ComponentType<AvatarProps>;
  };
}

const calculateItemWrapperZIndex = (index, total) => total - index;

export const AvatarGroup = <T,>(props: AvatarGroupProps<T>) => {
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
    components = {
      container: 'ul',
      itemWrapper: 'li',
      avatar: Avatar,
    },
  } = props;

  const Container = components.container;
  const ItemWrapper = components.itemWrapper;

  const avatarsData = useMemo(() => (maxCount ? data.slice(0, maxCount) : data), [data, maxCount]);

  const renderAvatar = useCallback(
    (avatarProps) => {
      const AvatarComponent = components.avatar;

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
    [components.avatar, classNames?.avatar, size, rounded, square, border],
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + '_stack']: stack,
        [_CLASS_IS + '_stack']: grid,
      })}
    >
      {avatarsData.map((_p, i) => (
        <ItemWrapper
          key={i}
          className={clsx(_CLASS_IS + '__item', classNames?.container)}
          style={{
            zIndex: calculateItemWrapperZIndex(i, avatarsData.length),
          }}
        >
          {renderAvatar(_p)}
        </ItemWrapper>
      ))}
    </Container>
  );
};
