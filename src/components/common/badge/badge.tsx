import "./badge.css";

import clsx from "classnames";
import React, { ComponentType, ReactNode, useMemo } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "badge";

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
