import "./badge.css";

import clsx from "classnames";
import React, { ComponentType, ReactNode, useMemo } from "react";

const _CLASS_IS = "roq-component-" + "badge";

export interface BadgeProps {
  children: ReactNode;
  maxValue?: number;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    Inner?: ComponentType<any>;
  };
}

const formatMaxValue = (val, maxVal) => {
  return val >= maxVal ? maxVal + "+" : val;
};

export const Badge = (props: BadgeProps) => {
  const { maxValue, children, className, classNames, components } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";

  const value = useMemo(() => Number(children), [children]);

  return (
    <Container className={clsx(_CLASS_IS, className, classNames?.container)}>
      <Inner className={clsx(_CLASS_IS + "__inner", classNames?.inner)}>
        {maxValue ? formatMaxValue(value, maxValue) : value}
      </Inner>
    </Container>
  );
};
