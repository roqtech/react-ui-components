import './conversation-card.css';

import clsx from 'classnames';
import React, { Element } from 'react';

import { AvatarGroup } from '../../common/avatar-group/avatar-group';
import { StackedText } from '../../common/stacked-text/stacked-text';

const _CLASS_IS = 'roq-widget-' + 'conversation-card';

interface ConversationCardProps {
  title: string;
  date: string;
  message: string;
  members: any[];
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

export const ConversationCard = (props: ConversationCardProps) => {
  const {
    title,
    date,
    message,
    members,
    className,
    classNames,
    components = { container: 'div', message: 'p' },
  } = props;

  const Container = components?.container ?? 'div';
  const Inner = components?.inner ?? 'div';
  const Message = components?.message ?? 'p';

  return (
    <Container className={clsx(_CLASS_IS, className, classNames?.container)}>
      <Inner>
        <div className={clsx(_CLASS_IS + '__top', classNames?.message)}>
          <AvatarGroup data={members} maxCount={2} size="large" />
          <StackedText primaryText={title} secondaryText={date} className={clsx(_CLASS_IS + '__top__title')} />
        </div>
        <Message className={clsx(_CLASS_IS + '__message', classNames?.message)}>{message}</Message>
      </Inner>
    </Container>
  );
};
