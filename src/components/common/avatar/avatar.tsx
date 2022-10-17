import './avatar.css';

import clsx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { DefaultImage } from './default-image';

const _CLASS_IS = 'roq-widget-' + 'avatar';

type AvatarSizeType = 'small' | 'medium' | 'large';

interface AvatarProps {
  name?: string;
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSizeType;
  rounded?: boolean;
  square?: boolean;
  border?: boolean;
  className?: string;
  classNames?: {
    container?: string;
    initials?: string;
    image?: string;
  };
}

const avatarSizeToClassName = (size: AvatarSizeType) => {
  switch (size) {
    case 'small':
    case 'medium':
    case 'large':
      return _CLASS_IS + `_size_${size}`;
  }
};

const getInitials = (initials: string): string =>
  initials
    .replace(/\s\s+/g, ' ')
    .split(' ')
    .reduce((acc, val) => acc + val.charAt(0), '');

export const Avatar = (props: AvatarProps) => {
  const {
    name,
    src,
    alt,
    initials,
    size = 'medium',
    rounded = true,
    square,
    border = true,
    className,
    classNames,
  } = props;

  const abbr = src ? null : name ? getInitials(name) : initials;

  const isDefault = isEmpty(name) && isEmpty(src) && isEmpty(abbr);

  const content = abbr ? (
    <span className={clsx(_CLASS_IS + '__initials', classNames?.initials)}>{abbr}</span>
  ) : (
    <img src={src} className={clsx(_CLASS_IS + '__image', classNames?.image)} />
  );

  return (
    <div
      className={clsx(_CLASS_IS, className, classNames?.container, avatarSizeToClassName(size), {
        [_CLASS_IS + '_rounded']: rounded,
        [_CLASS_IS + '_square']: square,
        [_CLASS_IS + '_border']: border,
      })}
    >
      {isDefault ? (
        <span className={clsx(_CLASS_IS + '__image', classNames?.image, _CLASS_IS + '__image_default')}>
          <DefaultImage />
        </span>
      ) : (
        content
      )}
    </div>
  );
};
