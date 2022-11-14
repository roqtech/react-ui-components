import React, { ComponentType, HTMLAttributes } from "react";
import clsx, { ClassValue } from "clsx";
import "./skeleton-box.scss";

const _CLASS_IS = "skeleton-box";

export interface SkeletonBoxPropsInterface {
  classNames?: {
    wrapper?: ClassValue;
    skeleton?: ClassValue;
  };
  components?: {
    Wrapper?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Skeleton?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className" | "style">
    >;
  };
  rows?: number;
  width: string;
  height: string;
}

export const SkeletonBox = (props: SkeletonBoxPropsInterface) => {
  const { classNames, components, ...rest } = props;
  const { rows, width, height } = rest;

  const Wrapper = components?.Wrapper ?? "span";
  const Skeleton = components?.Skeleton ?? "span";

  return (
    <Wrapper className={clsx(`${_CLASS_IS}-wrapper`, classNames?.wrapper)}>
      {[...Array(rows).keys()].map((_, index) => (
        <Skeleton
          key={`${_CLASS_IS}-${index}`}
          className={clsx(_CLASS_IS, classNames?.skeleton)}
          style={{ width, height }}
        />
      ))}
    </Wrapper>
  );
};

SkeletonBox.defaultProps = {
  rows: 1,
  width: "100%",
  height: "1em",
};
