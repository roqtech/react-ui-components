import './badge.css';

import clsx from 'classnames';
import React, { Element, useMemo } from 'react';

const _CLASS_IS = 'roq-widget-' + 'badge';

interface BadgeProps {
  maxValue?: number;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
  };
  components?: {
    container: Element;
    Inner: Element;
  };
}

const formatMaxValue = (val, maxVal) => {
  return val >= maxVal ? maxVal + '+' : val;
};

export const Badge = (props: BadgeProps) => {
  const {
    maxValue,
    children,
    className,
    classNames,
    components = {
      Container: 'span',
      Inner: 'span',
    },
  } = props;

  const { Container, Inner } = components;

  const value = useMemo(() => Number(children), [children]);

  return (
    <Container className={clsx(_CLASS_IS, className, classNames?.container)}>
      <Inner className={clsx(_CLASS_IS + '__inner', classNames?.inner)}>
        {maxValue ? formatMaxValue(value, maxValue) : value}
      </Inner>
    </Container>
  );
};
