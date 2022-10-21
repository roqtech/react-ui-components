import "./badge.scss";

import clsx from "classnames";
import React, { CSSProperties, ComponentType, ReactNode, useMemo } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "badge";

export interface BadgeProps {
  count: number;
  maxCount?: number;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    count?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    Count?: ComponentType<any>;
  };
}

const formatmaxCount = (val, maxVal) => {
  return val >= maxVal ? maxVal + "+" : val;
};

export const Badge = (props: BadgeProps) => {
  const { style, className, classNames, components } = props;
  const { count, maxCount, children } = props;

  const Container = components?.Container ?? "span";
  const Count = components?.Count ?? "span";

  const value = useMemo(() => Number(count), [count]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {children}
      <Count className={clsx(_CLASS_IS + "__count", classNames?.count)}>
        {maxCount ? formatmaxCount(value, maxCount) : value}
      </Count>
    </Container>
  );
};
