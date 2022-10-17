import './message-bubble.css';

import clsx from 'classnames';
import React, { Element } from 'react';

import { AvatarGroup } from '../../common/avatar-group/avatar-group';
import { StackedText } from '../../common/stacked-text/stacked-text';

const _CLASS_IS = 'roq-widget-' + 'message-bubble';

interface MessageBubbleProps {
  message: string;
  isSent?: boolean;
  showCorner?: boolean;
  className?: string;
  classNames?: {
    container?: string;
    message?: string;
  };
  components?: {
    container: Element;
    message: Element;
  };
}

export const MessageBubble = (props: MessageBubbleProps) => {
  const { isSent, showCorner, message, className, classNames, components = { container: 'div', message: 'p' } } = props;

  const Container = components.container;
  const Message = components.message;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + '_sent']: isSent,
        [_CLASS_IS + '_received']: !isSent,
        [_CLASS_IS + '_corner']: showCorner,
      })}
    >
      <Message className={clsx(_CLASS_IS + '__content', classNames?.message)}>{message}</Message>
    </Container>
  );
};
