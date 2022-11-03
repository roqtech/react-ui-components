import "./time-ago.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { formatTimeAgo } from "src/utils/format-time-ago.util";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "time-ago";

export interface TimeAgoProps {
  children?: ReactNode | string;
  timestamp?: Date | number | string;
  format?: (timestamp?: Date | number | string) => string;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
  };
  components?: {
    container: ComponentType<any>;
  };
}

export const TimeAgo = (props: TimeAgoProps) => {
  const {
    children,
    timestamp,
    format = formatTimeAgo,
    style,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.container ?? "span";

  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

  useEffect(() => {
    const t = setTimeout(() => {
      setUpdatedAt(new Date());
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  const value = useMemo(
    () => (children ? (children as string) : timestamp),
    [timestamp, children, updatedAt]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {format(value)}
    </Container>
  );
};
