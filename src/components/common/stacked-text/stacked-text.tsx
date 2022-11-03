import "./stacked-text.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "stacked-text";

export interface StackedTextPropsInterface {
  children?: ReactNode;
  text?: ReactNode | string;
  primaryText?: ReactNode | string | number | Date;
  secondaryText?: ReactNode | string | number | Date;
  tertiaryText?: ReactNode | string | number | Date;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    text?: string;
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
    Text?: ComponentType<HTMLAttributes<HTMLElement>>;
    PrimaryText?: ComponentType<HTMLAttributes<HTMLElement>>;
    SecondaryText?: ComponentType<HTMLAttributes<HTMLElement>>;
    TertiaryText?: ComponentType<HTMLAttributes<HTMLElement>>;
  };
}

export const StackedText = (props: StackedTextPropsInterface) => {
  const {
    children,
    text,
    primaryText,
    secondaryText,
    tertiaryText,
    disabled,
    style,
    className,
    classNames,
    components,
  } = props;

  const Container = components?.Container ?? "div";
  const Text = components?.Text ?? "span";
  const PrimaryText = components?.PrimaryText ?? Text;
  const SecondaryText = components?.SecondaryText ?? Text;
  const TertiaryText = components?.TertiaryText ?? Text;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {(children ?? text) && (
        <Text
          className={clsx(_CLASS_IS + "__text", classNames?.text, {
            [_CLASS_IS + "__text" + "-disabled"]: disabled,
          })}
        >
          {children ?? text}
        </Text>
      )}
      {primaryText && (
        <PrimaryText
          className={clsx(
            _CLASS_IS + "__text",
            _CLASS_IS + "__text-primary",
            classNames?.primaryText,
            {
              [_CLASS_IS + "__text" + "-disabled"]: disabled,
            }
          )}
        >
          {primaryText}
        </PrimaryText>
      )}
      {secondaryText && (
        <SecondaryText
          className={clsx(
            _CLASS_IS + "__text",
            _CLASS_IS + "__text-secondary",
            classNames?.secondaryText,
            {
              [_CLASS_IS + "__text" + "-disabled"]: disabled,
            }
          )}
        >
          {secondaryText}
        </SecondaryText>
      )}
      {tertiaryText && (
        <TertiaryText
          className={clsx(
            _CLASS_IS + "__text",
            _CLASS_IS + "__text-tertiary",
            classNames?.tertiaryText,
            {
              [_CLASS_IS + "__text" + "-disabled"]: disabled,
            }
          )}
        >
          {tertiaryText}
        </TertiaryText>
      )}
    </Container>
  );
};
