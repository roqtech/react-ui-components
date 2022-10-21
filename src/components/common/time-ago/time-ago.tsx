import "./time-ago.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "time-ago";

export interface TimeAgoProps {
  date: Date | number | string;
  format?: (d: Date | number | string) => string;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
  };
  components?: {
    container: ComponentType<any>;
  };
}

const formatTimeAgo = (date: Date | number | string) =>
  new Date(date).toLocaleString();

export const TimeAgo = (props: TimeAgoProps) => {
  const {
    date,
    format = formatTimeAgo,
    style,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.container ?? "span";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {format(date)}
    </Container>
  );
};
