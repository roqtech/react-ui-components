import './message-history.css';

import clsx from 'classnames';
import React, { Element, useMemo, useCallback } from 'react';

import { AvatarGroup } from '../../common/avatar-group/avatar-group';
import { StackedText } from '../../common/stacked-text/stacked-text';
import { MessageBubble } from '../message-bubble/message-bubble';

const _CLASS_IS = 'roq-widget-' + 'message-history';

interface MessageHistoryProps {
  messages: any[];
  className?: string;
  classNames?: {
    container?: string;
    line?: string;
    message?: string;
  };
  components?: {
    container: Element;
    line: Element;
    message: Element;
  };
}

export const MessageHistory = (props: MessageHistoryProps) => {
  const {
    messages,
    className,
    classNames,
    components = { container: 'div', line: 'div', message: MessageBubble },
  } = props;

  const Container = components.container;
  const Line = components.line;

  const renderMessage = useCallback(
    (message) => {
      const Message = components.message;

      return <Message {...message} className={clsx(_CLASS_IS + '__line__message', classNames?.message)} />;
    },
    [components?.message, classNames?.message],
  );

  return (
    <Container className={clsx(_CLASS_IS, className, classNames?.container)}>
      {messages.map((message) => (
        <Line
          className={clsx(_CLASS_IS + '__line', classNames?.line, {
            [_CLASS_IS + '__line_sent']: message.isSent,
          })}
        >
          {renderMessage(message)}
        </Line>
      ))}
    </Container>
  );
};
