import "./stacked-text.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties } from "react";

const _CLASS_IS = "roq-component-" + "stacked-text";

interface StackedTextProps {
  text?: string;
  primaryText?: string;
  secondaryText?: string;
  tertiaryText?: string;
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
    container: ComponentType<any>;
    text: ComponentType<any>;
    primaryText: ComponentType<any>;
    secondaryText: ComponentType<any>;
    tertiaryText: ComponentType<any>;
  };
}

export const StackedText = (props: StackedTextProps) => {
  const {
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

  const Container = components?.container ?? "div";
  const Text = components?.text ?? "span";
  const PrimaryText = components?.primaryText ?? Text;
  const SecondaryText = components?.secondaryText ?? Text;
  const TertiaryText = components?.tertiaryText ?? Text;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {text && (
        <Text
          className={clsx(_CLASS_IS + "__text", classNames?.text, {
            [_CLASS_IS + "__text" + "-disabled"]: disabled,
          })}
        >
          {text}
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
