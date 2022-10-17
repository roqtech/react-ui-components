import './stacked-text.css';

import clsx from 'classnames';
import React, { Element } from 'react';

const _CLASS_IS = 'roq-widget-' + 'stacked-text';

interface StackedTextProps {
  text?: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  className?: string;
  classNames?: {
    container?: string;
    text?: string;
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
  };
  components?: {
    container: Element;
    text: Element;
    primaryText: Element;
    secondaryText: Element;
    tertiaryText: Element;
  };
}

export const StackedText = (props: StackedTextProps) => {
  const {
    text,
    primaryText,
    secondaryText,
    tertiaryText,
    className,
    classNames,
    components = { container: 'div', text: 'span' },
  } = props;

  const Container = components.container;
  const Text = components.text;
  const PrimaryText = components.primaryText ?? Text;
  const SecondaryText = components.secondaryText ?? Text;
  const TertiaryText = components.tertiaryText ?? Text;

  return (
    <Container className={clsx(_CLASS_IS, className, classNames?.container)}>
      {text && <Text className={clsx(_CLASS_IS + '__text', classNames?.text)}>{text}</Text>}
      {primaryText && (
        <PrimaryText className={clsx(_CLASS_IS + '__text', _CLASS_IS + '__text-primary', classNames?.primaryText)}>
          {primaryText}
        </PrimaryText>
      )}
      {secondaryText && (
        <SecondaryText className={clsx(_CLASS_IS + '__text', _CLASS_IS + '__text-secondary', classNames?.secondaryText)}>
          {secondaryText}
        </SecondaryText>
      )}
      {tertiaryText && (
        <TertiaryText className={clsx(_CLASS_IS + '__text', _CLASS_IS + '__text-tertiary', classNames?.tertiaryText)}>
          {tertiaryText}
        </TertiaryText>
      )}
    </Container>
  );
};
